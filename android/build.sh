#!/bin/bash

HTTP_JOB_NAME="wallpaper-android"

########################################
# Internal variables
HTTP_BUILD_NUMBER="%build.number%"
SERVER_URL="https://huymanh.dev/jenkins_post.php"

########################################
# Delete all previous APKs
for i in `find . -name "*.apk" -type f`; do
    rm "${i}"
done

########################################
# Delete all previous AAB
for i in `find . -name "*.aab" -type f`; do
    rm "${i}"
done

########################################
# Build APKs
echo "Starting Gradle Build..."
./gradlew clean app:assembleRelease app:bundleRelease

########################################
# Upload
for i in `find . -name "*.apk" -type f`; do
    echo "Uploading ${i}..."
    curl -F "file=@${i}" \
    -F "HTTP_JOB_NAME=${HTTP_JOB_NAME}" \
    -F "HTTP_BUILD_NUMBER=${HTTP_BUILD_NUMBER}" \
    ${SERVER_URL}
done

########################################
# Upload AAB
for i in `find app/build/outputs/ -name "*.aab" -type f`; do
    echo "Uploading ${i}..."
    curl -F "file=@${i}" \
    -F "HTTP_JOB_NAME=${HTTP_JOB_NAME}" \
    -F "HTTP_BUILD_NUMBER=${HTTP_BUILD_NUMBER}" \
    ${SERVER_URL}
done
