Sequence of calls to mediaclip

POST /api/user/hub/token/create - with auth token in header
  {
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJodWJVc2VySWQiOiI2ZGZhYWQ0Yi04NWNkLTQ1MjAtYThlZC1hNzIzYjE3MTliYTEiLCJzdG9yZUlkIjoienQ0eXI0cjlleCIsInJvbGVzIjpbXSwiaGFzQWxpYXNlcyI6ZmFsc2UsImV4cCI6MTY5NDExMzQ0MH0.fIgVmbRNRVGhsZTZtLSSDcDy6YRX6HlyQ6miYSmPgbKX2Ob4AQAy-X9GP5_g-VL-NoCyWlBdnB4jh4LC5AuOQA",
      "issueDateUtc": "2023-09-07T13:04:00.2246140Z",
      "expirationUtc": "2023-09-07T19:04:00.0000000Z",
      "userId": "6dfaad4b-85cd-4520-a8ed-a723b1719ba1",
      "scheme": "HubStoreUserToken"
  }

POST /stores/zt4yr4r9ex/users/6dfaad4b-85cd-4520-a8ed-a723b1719ba1/sources/uploads/photos?async=true&originalFilename=DFD22275-A53E-480E-98ED-2371624CB624.JPG - with token in header
  posts the file in the body to upload

GET /photos/urn%3Amediaclip%3Aphoto%3Auploads%3A0ceacff0-ca2b-46d8-be47-19571c36bac4/pendingStatus?attempt=1
  ** this checks status, and will return {status: "Pending", remaining: 500} or {status: "Done", remaining: 1500}

POST /stores/zt4yr4r9ex/users/6dfaad4b-85cd-4520-a8ed-a723b1719ba1/queries/photos?bucketId=00000000-0000-0000-0000-000000000000&includeMetadata=true
  body: {ids: ["urn:mediaclip:photo:uploads:0ceacff0-ca2b-46d8-be47-19571c36bac4"]}
  *** gets the image info

POST /stores/zt4yr4r9ex/beautyshots
  body: { beautyShots: [ {
    module: 'Gifting', photoUrns: ["urn:mediaclip:photo:uploads:0ceacff0-ca2b-46d8-be47-19571c36bac4"],
    productId: "$(package:mediaclip/office)/products/mousepad", themeUrl: "$(package:mediaclip/core)/themes/full-size-photo"
    }, ...
  ]}

GET https://render.mediacliphub.com/beautyshot?productId=$(package%3Amediaclip%2Foffice)%2Fproducts%2Fmousepad&themeUrl=$(package%3Amediaclip%2Fcore)%2Fthemes%2Ffull-size-photo&module=Gifting&photos=urn%3Amediaclip%3Aphoto%3Auploads%3A0ceacff0-ca2b-46d8-be47-19571c36bac4&_alg=HS512&_exp=1694102400&_iat=1694088000&_iss=hub&_nbf=1694088000&_sub=hubUser.6dfaad4b-85cd-4520-a8ed-a723b1719ba1&_ver=2&_sig=11bfd0cd9b8b4676797a5c7519476c46b7f177e300d18bef51cc7c685b50ae7f2ae7956c3a8a3cc641dac0397affeb8665610412fdbba5f939840de87cb19149