# Nest.js application starter

Prerequisites: node, npm, nest-cli `[sudo] npm install --global nest-cli`. 

## Scaffold new backend

`nest new my-project` or `nest new .` or `new new . --skip-git`.  > select `npm` 

`npm start` or `npm start:dev` to check backend app on `localhost:3000`

`npm run test` or `npm run test:watch` to see testing. 

## Add ORM

We'll use prisma.js ORM.

Inside the backend folder,  `npm install --save-dev prisma` and then `npx prisma init` will create backend/prisma/schema.prisma as well as .env file.

backend/prisma/schema.prisma: set db.provider = "mysql"

backend/.env: set DATABASE_URL = mysql://USER:PASSWORD@HOST:PORT/DATABASE (based on next step).

Craete schema model (tables) inside backend/prisma/schema.prisma

`npx prisma db push` This command is enough for initial prototyping. In order to version changes in migration files, when you have done you prototyping, then you can do `npx prisma migrate dev --name init` to create first versioned migration. Later on, when deploying, `npx prisma migrate deploy` feeds off of these migrations.

`npm install @prisma/client` to install the client. As needed, run the harmless command `npx prisma generate` to update the client with latest model in prisma.schema.

`nest generate service prisma --no-spec` adds service to src/prisma, add the following code:

```typescript
import { PrismaClient } from '@prisma/client';
import { INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless',
    });
  }
  async onModuleInit() {
    await this.$connect();
  }    
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

This PrismaService is ready to be used by CRUD modules (it also has logging configured, which can be used as below).

```typescript
@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }
}
```

But first we need to see the data and do some testing:

Add the following to package.json:

```typescript
"prisma": {
  "seed": "ts-node prisma/seed.ts"
},
```

Add seed.ts to backend/prisma and add the following:

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Then do

`npm install -D typescript ts-node @types/node`



## Start Local Database

Create local mysql databse web_prototyping_dev_db

```sql
CREATE SCHEMA `web_prototyping_dev_db` DEFAULT CHARACTER SET utf8mb4;
```

using utfmb4 as character set and utf8mb4_general_ci as collation:

![image-20211017172851258](/Users/r.rana/Library/Application Support/typora-user-images/image-20211017172851258.png)

Database URL string for prisma:

`DATABASE_URL="mysql://root:root12345@localhost:3306/web_prototyping_dev_db"`



## Enable CORS

Source: https://docs.nestjs.com/security/cors

```typescript
// main.ts
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(3000);
```



## CRUD coding pattern for backend

`nest generate resource post`  will create REST API CRUD full resource at baseurl/post

```typescript
GET /post # all posts
GET /post/:id # one post
GET /post?query=value # find all posts by query
POST /post # create post
DEL /post/:id # delete one post
PATCH /post/:id # update one post
```

PostService:

```typescript
@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.prismaService.post.create({ data });
  }

  async findAll(): Promise<PostModel[]> {
    return this.prismaService.post.findMany({});
  }

  async findOne(where: Prisma.PostWhereUniqueInput): Promise<PostModel> {
    return this.prismaService.post.findUnique({
      where,
    });
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<PostModel> {
    const { where, data } = params;
    return this.prismaService.post.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.PostWhereUniqueInput): Promise<PostModel> {
    return this.prismaService.post.delete({
      where,
    });
  }
}
```

PostController:

```typescript
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.postService.create(data);
  }

  @Get()
  async findAll(): Promise<PostModel[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostModel> {
    return this.postService.findOne({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.PostUpdateInput,
  ): Promise<PostModel> {
    return this.postService.update({
      where: { id: +id },
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PostModel> {
    return this.postService.remove({ id: +id });
  }
}
```

