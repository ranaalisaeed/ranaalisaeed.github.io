# AWS CLI useful commands

[AWS CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/index.html#cli-aws) 

```bash
aws elbv2 describe-target-groups [--target-group-arn ...]
aws elbv2 delete-target-group --target-group-arn ...
```



Clusters

```bash
aws ecs list-clusters // grab just the cluster name e.g :cluster/dev
aws ecs describe-clusters --cluster dev
```

ACR

```bash
aws ecr describe-repositories

```

