Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
module.exports = function ($platformsData, $testExecutionService) {
    if ($testExecutionService && $testExecutionService.platform) {
        var platformData = $platformsData.getPlatformData($testExecutionService.platform), projectFilesPath = path.join(platformData.appDestinationDirectoryPath, "app"), packageJsonPath = path.join(projectFilesPath, 'package.json'), packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
        // When test command is used in ns-cli, we should change the entry point of the application
        packageJson.main = "./tns_modules/nativescript-unit-test-runner/app.js";
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
    }
};
