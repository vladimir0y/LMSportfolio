#!/bin/bash

# Standalone SCORM Upload Script for Practice1.zip
# Extracts and processes SCORM package without database dependency

SCORM_FILE="./Powerpoint Software Simulator/Practice1.zip"
UPLOAD_DIR="uploads/scorm"
TEMP_DIR="uploads/temp"

echo "🚀 Processing SCORM package: $SCORM_FILE"

# Check if Practice1.zip exists
if [ ! -f "$SCORM_FILE" ]; then
    echo "❌ Error: $SCORM_FILE not found"
    exit 1
fi

# Create necessary directories
mkdir -p "$UPLOAD_DIR"
mkdir -p "$TEMP_DIR"

# Extract package name from zip file
PACKAGE_NAME="Practice1"
EXTRACT_PATH="$UPLOAD_DIR/$PACKAGE_NAME"

echo "📦 Package Name: $PACKAGE_NAME"
echo "📁 Extract Path: $EXTRACT_PATH"

# Remove existing extraction if it exists
if [ -d "$EXTRACT_PATH" ]; then
    echo "🔄 Removing existing package directory..."
    rm -rf "$EXTRACT_PATH"
fi

# Create package directory
mkdir -p "$EXTRACT_PATH"

# Extract the SCORM package
echo "📂 Extracting SCORM package..."
if command -v unzip >/dev/null 2>&1; then
    unzip -q "$SCORM_FILE" -d "$EXTRACT_PATH"
    if [ $? -eq 0 ]; then
        echo "✅ Package extracted successfully"
    else
        echo "❌ Failed to extract package"
        exit 1
    fi
else
    echo "❌ Error: unzip command not found"
    exit 1
fi

# Look for imsmanifest.xml to validate SCORM package
MANIFEST_FILE="$EXTRACT_PATH/imsmanifest.xml"
if [ -f "$MANIFEST_FILE" ]; then
    echo "✅ SCORM manifest found: imsmanifest.xml"
else
    echo "⚠️  Warning: imsmanifest.xml not found - may not be a valid SCORM package"
fi

# Find the launch file (usually index.html or as specified in manifest)
LAUNCH_FILE=""
if [ -f "$EXTRACT_PATH/index.html" ]; then
    LAUNCH_FILE="index.html"
elif [ -f "$EXTRACT_PATH/index.htm" ]; then
    LAUNCH_FILE="index.htm"
else
    # Look for any HTML file
    HTML_FILE=$(find "$EXTRACT_PATH" -name "*.html" -o -name "*.htm" | head -n 1)
    if [ ! -z "$HTML_FILE" ]; then
        LAUNCH_FILE=$(basename "$HTML_FILE")
    else
        LAUNCH_FILE="index.html"  # Default fallback
    fi
fi

echo "🚀 Launch File: $LAUNCH_FILE"

# Create metadata file
METADATA_FILE="$EXTRACT_PATH/.openlms.json"
cat > "$METADATA_FILE" << EOF
{
  "packageName": "$PACKAGE_NAME",
  "launchFile": "$LAUNCH_FILE",
  "extractedAt": "$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")",
  "originalFile": "$SCORM_FILE",
  "scormVersion": "1.2",
  "type": "scorm"
}
EOF

echo "📄 Metadata file created: .openlms.json"

# Calculate launch URL
LAUNCH_URL="/public/scorm/$PACKAGE_NAME/$LAUNCH_FILE"

# Display results
echo ""
echo "🎉 SCORM Package Processed Successfully!"
echo "=================================="
echo "📦 Package Name: $PACKAGE_NAME"
echo "🚀 Launch File: $LAUNCH_FILE" 
echo "🔗 Launch URL: $LAUNCH_URL"
echo "📁 Location: $EXTRACT_PATH"
echo ""

# Save the scorm_id_practice for later use
echo "$PACKAGE_NAME" > scorm_id_practice.txt
echo "💾 SCORM ID Practice saved to: scorm_id_practice.txt"

echo ""
echo "🔍 RECORD THIS VALUE:"
echo "scorm_id_practice = $PACKAGE_NAME"

# Create a simple JSON response for compatibility
cat > scorm_upload_response_practice.json << EOF
{
  "success": true,
  "packageName": "$PACKAGE_NAME",
  "launchUrl": "$LAUNCH_URL",
  "launchFile": "$LAUNCH_FILE",
  "extractPath": "$EXTRACT_PATH",
  "message": "SCORM package uploaded and extracted successfully"
}
EOF

echo "📝 Response saved to: scorm_upload_response_practice.json"
echo ""
echo "✨ Upload process completed!"
