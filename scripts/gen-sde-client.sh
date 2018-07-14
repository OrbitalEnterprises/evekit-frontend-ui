#!/bin/bash
#
# Generate an SDE client for the latest published SDE spec.  Results will be placed in the directory where this command is executed.
SRCSPEC=https://evekit-sde.orbital.enterprises/latest/swagger.json

# Prepare work area
WKDIR=${TMPDIR}/work-$$
mkdir ${WKDIR}
echo "Client will be assembled in directory ${WKDIR}"
trap "rm -rf ${WKDIR}" EXIT
SRCDIR=${PWD}
cd ${WKDIR}

# Retrieve client from generator
curl -X POST -H "content-type:application/json" -d '{"swaggerUrl":"'${SRCSPEC}'"}' https://generator.swagger.io/api/gen/clients/typescript-angular > client_gen_response.json
CLLINK=$(cat client_gen_response.json | jq '.link' | tr -d '"')
wget -O tsclient.zip ${CLLINK}
unzip tsclient.zip

# Format client
mv typescript-angular-client sde-service-api
cd sde-service-api
'rm' -rf .gitignore .swagger* git_push.sh
mv api.module.ts sde-service-api.module.ts
sed -i '' -e 's/ApiModule/SdeServiceApiModule/g' sde-service-api.module.ts
sed -i '' -e 's/api\.module/sde-service-api.module/g' index.ts
sed -i '' -e 's/rxjs\/Observable/rxjs/g' $(find api -name '*.ts')

# Copy finished client
cd ..
mv sde-service-api ${SRCDIR}
cd ${SRCDIR}

