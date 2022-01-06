# Angular application starter



## Scaffold new backend

mkdir frontend && cd $_

ng new --directory . --skip-git



## CRUD coding pattern for frontend

While as backend, we create one Resource to provide CRUD operations, at the frontend, you'll likely have three controllers and one service to cover CRUD operations:

```bash
ng generate services services/post
ng generate controller post-list # API call: GET /post and DEL /post/:id
ng generate controller post-detail # API call: GET /post/:id and PUT /post/:id
ng generate controller add-post # API call: POST /post
```

#### Router routes

The order of routes is important `post/create` will also match `post/:id` so it's important to place create route first. `const routes: Routes = [...];`

```typescript
{ path: '', redirectTo: 'post', pathMatch: 'full' },
{ path: 'posts', component: PostListComponent }, // handle list all
{ path: 'posts/create', component: AddPostComponent } // handle add new
{ path: 'posts/:id', component: PostDetailComponent }, // handle view/edit/delete one
```

Another option is child routes:

```typescript
{ path: '', redirectTo: 'post', pathMatch: 'full' },
  {
    path: 'post', component: PostListComponent,
    children: [
      { path: 'create', component: AddPostComponent },
      { path: ':id', component: PostDetailComponent },
    ],
},
```

In case of child routes, we need to add an extra `<router-outlet></router-outlet>` to `post-list.component.ts`

#### Common PostService

Import http module to make http calls.

```typescript
// app.module.ts
import { HttpClientModule } from '@angular/common/http';
imports: [ HttpClientModule ],
```

Import http client and run all CRUD operations.

```typescript
// post.service.ts
import { HttpClient } from '@angular/common/http';
const baseUrl = 'http://localhost:8080/api/tutorials';
@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
```



## Now add CRUD components code in way that generates flow in the app

What is the basic flow of CRUD in the app

* **AddPost Component**: 
  * Add new item, once added says submitted, and gives a button to add more items
  * A button to go to list items going to PostList Component
* **PostList Component**:
  * List all items, ability select an item (could be hyperlinks) and see details going to PostDetail Component
  * A button to add new item that goes to AddPost Component
* **PostDetail Component**:
  * View detail of item, and able to change details then select Update buttom to patch/put an item.
  * Delete an item
  * A button to go to list items going to PostList Component

#### AddPost Component 

Inspiration from https://www.bezkoder.com/angular-10-crud-app/ and https://angular.io/guide/reactive-forms

```typescript
// add-post.component.ts
export class AddPostComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl(''),
  });

  submitted: boolean = false;

  constructor(private post: PostService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.post.create(this.postForm.value).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newPost(): void {
    this.submitted = false;
    this.postForm.reset();
  }
}
```

```html
// add-post.component.html
<div *ngIf="!submitted">
  <form [formGroup]="postForm" (ngSubmit)="onSubmit()">
    <label for="title">Title</label>
    <input id="title" type="text" formControlName="title" />

    <label for="content">Content</label>
    <input id="content" type="textarea" formControlName="content" />

    <button type="submit" [disabled]="!postForm.valid">Submit</button>
  </form>
</div>

<div *ngIf="submitted">
  <h4>You submitted successfully!</h4>
  <button class="btn btn-success" (click)="newPost()">Add post</button>
</div>

<button routerLink="/post">Back to list</button>
```

#### PostList Component

In case of list, I find it easiest to start with the view defined in the HTML file. Now the file below shows that I need `posts` as an array of `Post` coming from the controller. Here's the post-list.component.html file:

```html
<h2>Post List</h2>
<ul>
  <li *ngFor="let post of posts">
    <a routerLink="/post/{{ post.id }}">{{ post.title }}</a>
  </li>
</ul>
<button routerLink="/post/create">Add post</button>
```

Now we work on the controller post-list.component.ts :

```typescript
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  selectedPost?: Post;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAll().subscribe(
      (response) => (this.posts = response),
      (error) => {
        console.log(error);
      }
    );
  }
}
```

#### PostDetail Component

```typescript
export class PostDetailComponent implements OnInit {
  post?: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPost(id);
  }

  getPost(id: number) {
    this.postService.get(id).subscribe(
      (response) => {
        console.log(response);
        this.post = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePost() {
    this.postService.delete(this.post!.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/post']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePost() {
    this.postService.update(this.post!.id, this.post!).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/post']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
```

```html
<div *ngIf="post">
  <form (ngSubmit)="updatePost()">
    <label for="title">Title</label>
    <input id="title" type="text" [(ngModel)]="post.title" name="title" />

    <label for="content">Content</label>
    <input id="content" type="textarea" [(ngModel)]="post.content" name="content"/>

    <button type="submit">Update</button>
    <button (click)="deletePost()">Delete</button>
  </form>
</div>

<button routerLink="/post">Back to list</button>
```

