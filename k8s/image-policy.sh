#!/bin/bash

# Set the image pull policy (you can modify this to 'Always', 'IfNotPresent', 'Never')
IMAGE_PULL_POLICY="IfNotPresent"

# List of deployment files (updated with the correct file names based on your directory structure)
DEPLOYMENT_FILES=("frontend-deployment.yml" "backend-deployment.yml" "mongo-deployment.yml")

# Loop through the specified deployment files
for DEPLOYMENT_FILE in "${DEPLOYMENT_FILES[@]}"; do
  if [[ -f "$DEPLOYMENT_FILE" ]]; then  # Check if it's a file
    echo "Updating imagePullPolicy in $DEPLOYMENT_FILE"
    
    # Check if imagePullPolicy already exists
    if grep -q "imagePullPolicy" "$DEPLOYMENT_FILE"; then
      # Update the existing imagePullPolicy
      sed -i "s|imagePullPolicy: .*|imagePullPolicy: $IMAGE_PULL_POLICY|" "$DEPLOYMENT_FILE"
    else
      # Add imagePullPolicy under the container spec
      sed -i "/image: /a \ \ \ \ imagePullPolicy: $IMAGE_PULL_POLICY" "$DEPLOYMENT_FILE"
    fi
  else
    echo "File $DEPLOYMENT_FILE does not exist. Skipping."
  fi
done

echo "Successfully updated imagePullPolicy in specified deployment files."

