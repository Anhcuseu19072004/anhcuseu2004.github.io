@echo off
if %1 == 1  (
	cd.. 
	cd Scripts
	activate.bat 1
) else (
	cd.. 
	cd Scripts 
	activate.bat 0
	)  

