This directory contains a Jenkinsfile which can be used to build
prontuario using an OpenShift build pipeline.

To do this, run:

```bash
# create the nodejs example as usual
oc new-app https://github.com/silassouza/prontuario

# now create the pipeline build controller from the openshift/pipeline
# subdirectory
oc new-app https://github.com/silassouza/prontuario \
  --context-dir=openshift/pipeline --name prontuario-pipeline
```
