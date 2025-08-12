# SCORM Upload API Documentation

## Step 2: Upload Intro.zip via SCORM API

### API Endpoint
- **URL**: `http://localhost:4000/api/scorm/upload`
- **Method**: POST
- **Content-Type**: multipart/form-data

### Request Parameters
- **file**: The SCORM package file (Intro.zip)

### Direct cURL Command
```bash
curl -X POST \
  -F "file=@./Powerpoint Software Simulator/Intro.zip" \
  -H "Accept: application/json" \
  http://localhost:4000/api/scorm/upload
```

### Expected Response Format
```json
{
  "success": true,
  "packageName": "Intro",
  "launchUrl": "/public/scorm/Intro/index.html",
  "message": "SCORM package uploaded and extracted successfully"
}
```

### Key Response Fields
- **packageName**: This is the `scorm_id_intro` equivalent identifier
- **launchUrl**: The URL to launch the SCORM content
- **success**: Boolean indicating upload success

### What the Upload Process Does
1. Validates the uploaded ZIP file
2. Extracts and parses the `imsmanifest.xml` file
3. Determines the launch file (usually index.html)
4. Extracts all SCORM content to `uploads/scorm/{packageName}/`
5. Creates metadata file `.openlms.json`
6. Returns the package identifier for curriculum linking

### Post-Upload Storage
- **Location**: `./uploads/scorm/Intro/`
- **Launch File**: Usually `index.html` or as specified in manifest
- **Metadata**: `.openlms.json` contains package information

### Capturing the SCORM ID
The `packageName` field in the response serves as the `scorm_id_intro` identifier needed for later curriculum linking.

Example extraction:
```bash
scorm_id=$(echo "$response" | jq -r '.packageName')
echo "$scorm_id" > scorm_id_intro.txt
```

### Prerequisites
- Backend server running on port 4000
- Intro.zip file present in "./Powerpoint Software Simulator/" directory
- Server has write permissions to "./uploads/temp" and "./uploads/scorm" directories
