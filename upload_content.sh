#!/bin/bash

# SCORM Upload Script for Content.zip
# Uploads Content.zip to the SCORM API endpoint

BACKEND_URL="http://localhost:4000"
SCORM_FILE="./Powerpoint Software Simulator/Content.zip"

echo "Uploading SCORM package: $SCORM_FILE"
echo "Target endpoint: $BACKEND_URL/api/scorm/upload"

# Send POST request with multipart form-data
response=$(curl -X POST \
  -F "file=@$SCORM_FILE" \
  -H "Accept: application/json" \
  "$BACKEND_URL/api/scorm/upload" \
  -w "\n%{http_code}" -s)

# Extract HTTP status code and response body
http_code=$(echo "$response" | tail -n1)
response_body=$(echo "$response" | sed '$d')

echo "HTTP Status: $http_code"
echo "Response: $response_body"

if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
    echo "✅ Content SCORM package uploaded successfully!"
    
    # Extract packageName (scorm_id_content equivalent)
    package_name=$(echo "$response_body" | grep -o '"packageName":"[^"]*"' | cut -d'"' -f4)
    
    if [ ! -z "$package_name" ]; then
        echo "📦 SCORM ID Content (packageName): $package_name"
        echo "🔗 Launch URL: /public/scorm/$package_name/index.html"
        
        # Save the scorm_id_content for later use
        echo "$package_name" > scorm_id_content.txt
        echo "💾 SCORM ID Content saved to: scorm_id_content.txt"
        
        # Also display for recording
        echo ""
        echo "🔍 RECORD THIS VALUE:"
        echo "scorm_id_content = $package_name"
    fi
else
    echo "❌ Upload failed with status: $http_code"
    echo "Response: $response_body"
fi
