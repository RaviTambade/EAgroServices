
REM REMOVE /B if you want to run  api in different console window 
start  /B cmd.exe /C "cd AccountsAPI & title AccountsAPI & dotnet run"
start  /B cmd.exe /C "cd AdminAPI & title AdminAPI & dotnet run"
start  /B cmd.exe /C "cd AuthAPI & title AuthAPI & dotnet run"
start  /B cmd.exe /C "cd MerchantsAPI & title MerchantsAPI & dotnet run"
@REM start  /B cmd.exe /C "cd FarmersAPI & title FarmersAPI & dotnet run"
@REM start  /B cmd.exe /C "cd EmployeesAPI & title EmployeesAPI & dotnet run"
@REM start  /B cmd.exe /C "cd TransportsAPI & title TransportsAPI & dotnet run"
@REM start  /B cmd.exe /C "cd VarietiesAPI & title VarietiesAPI & dotnet run"
@REM start  /B cmd.exe /C "cd PurchaseAPI & title PurchaseAPI & dotnet run"
@REM start  /B cmd.exe /C "cd SellsAPI & title SellsAPI & dotnet run"