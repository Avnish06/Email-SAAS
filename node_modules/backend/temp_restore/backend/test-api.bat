@echo off
echo Testing /api/v1/userinfo/userdetails endpoint...
echo.

curl -X POST http://localhost:8001/api/v1/userinfo/userdetails ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User\",\"role\":\"CEO\",\"companyName\":\"Test Company\",\"address\":\"123 Test St\",\"state\":\"Test State\",\"city\":\"Test City\",\"postcode\":\"123456\",\"contactsize\":100,\"industrytype\":\"Technology\"}"

echo.
echo.
echo Check the backend terminal for detailed error logs!
pause
