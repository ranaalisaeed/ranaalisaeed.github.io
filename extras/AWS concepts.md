# AWS concepts





Check subnetting on  [Visual Subnet Calculator](https://www.davidc.net/sites/default/subnets/subnets.html) 

### Create VPC

 (ctt-vpc-01) - /24 = 254 hosts

IPv4 CIDR block: 192.168.0.0/24 (Netmark: 255.255.255.0)

Enable DNS hostnames and DNS resolution for VPC (Select > Actions > Edit DNS resolution), **because** ... 

Add a default route (0.0.0.0/0 > ctt-internet-gateway) to the Main Routing Table of the VPC, which is also used by all subnets, **because** ... it is required to enable [internet access for internet gateways](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html).

### Create Subnets

(ctt-subnet-xx) - /26 = 59 hosts

- ctt-subnet-01 CIDR: 192.168.0.0/26
- ctt-subnet-02 CIDR: 192.168.0.64/26
- ctt-subnet-03 CIDR: 192.168.0.128/26

Enable auto assign public IPv4 address for each gateway, **because** ... it is required to enable [internet access for internet gateways](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html) as stated in piont: instances in your subnet have a globally unique IP address

### Create Internet gateway

 (ctt-internet-gateway)

Create internet gateway

Attach VPC (ctt-vpc-01) to it, **because** ... only VPCs with an internet gateway are enabled for selection in load balancers.

### Create Security group

(ctt-security-group)

Attached to VPC (ctt-vpc-01). Add inbound rules that are needed for the app to work, **because** ... it is required to enable [internet access for internet gateways](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html).

* HTTP (Protocol TCP) Port 80 > 0.0.0.0/0
* MYSQL (Protocol TCP) Port 3306 > 0.0.0.0/0
* Custom TCP (Protocol TCP) Port 3000 > 0.0.0.0/0

![Screen Shot 2021-10-15 at 11.56.52 am](/Users/r.rana/Pictures/Screenshots/Screen Shot 2021-10-15 at 11.56.52 am.png)



### Create Target Group

(ctt-target-group)

Target type: IP addresses, Protocol: HTTP, Port: 3000, Connect to VPC (ctt-vpc-01), Protocol version HTTP1

Register targets ????? When, what IP, how? Targets will be registered automatically once the service starts running. [Target groups for Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html).

Target should be healthy!!! How?? Target will become healthy once the service is up and running and health check passes.

### Create Application Load Balancer

 (ctt-application-load-balancer)



![image-20211015135601335](/Users/r.rana/Library/Application Support/typora-user-images/image-20211015135601335.png)



## Elastic Container Registry (ECR)



### Create Repository

(ctt-repository)

Private, Tag immutability disabled.

Push Image to Repository by following push commands provided in ECR repo.



## Elastic Container Service (ECS)

**Task role = ecsTaskExecutionRole**

**Task execution role = ecsTaskExecutionRole**

**Task execution role must be set to ecsTaskExecutionRole**

Before Task, create a new Role in Management console: 

AWS Service --> Service: Elastic Container Service --> Use Case: Elastic Container Service Task

Tick: AmazonECSTaskExecutionRolePolicy

Name: firethrive-cms-task-role



### Create Task

(ctt-fargate-task-staging)

### Create Cluster

(ctt-cluster-staging)

### Create Service

(ctt-fargate-service-staging)

![image-20211015153906406](/Users/r.rana/Library/Application Support/typora-user-images/image-20211015153906406.png)

![image-20211015153822175](/Users/r.rana/Library/Application Support/typora-user-images/image-20211015153822175.png)

### Obtain domain from Route 53



### Setup Hosted DNS Zone

https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html

Concepts:

* To route domain traffic to an ELB load balancer, use Amazon Route 53 to create an [alias record](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html) that points to your load balancer. An **alias record** is a Route 53 extension to DNS. It's similar to a **CNAME record**, but you can create an **alias record** both for the root domain, such as example.com, and for subdomains, such as www.example.com. (You can create **CNAME records** only for subdomains.)



### Obtain certificate from Certificate Manager



Route domain to Load Balancer



