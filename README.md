# Smartreferralweb

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Development server
Run `ng serve` --host 0.0.0.0 --port 8080 --disableHostCheck' for a dev server. 
Navigate to `http://smartreferralwebproject-bofcarbon1.c9users.io:8080/`. 
This app was developed using the Cloud 9 IDE which is specific about the URL
and has limited ports.


## Running unit tests

Run `ng serve` --host 0.0.0.0 --port 8080 --disableHostCheck' to run on the
development server. The companion application is a .NET Core 2.0 Web Api 
that was developed using Visual Studio 2017 Community. That code can be found
at the same Github site https://github.com/bofcarbon1. You could choose to
write your own back end service in Express or other and replace data SQL Server
database with MongoDB or other option.

## Deploying to GitHub Pages

This application was pushed to GitHub Pages using the following URL.
https://github.com/bofcarbon1/smartreferral.web

## Further help on angular-cli

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## The Smartreferralweb Application Details

A Web Application using Angular 4, Typescript ES6, with node.js maintains candidate referral details. Provides a selectable list of candidates along with their skills and competencies. Referral candidates will be given points based on established criteria for recommendation to recruiters for IT jobs. There is also a report that allows you to enter multiple skills and generate a sortable candidate list by skill match percentage. 
Angular 2 & Cloud 9 IDE Prerequisites

Workspace:
Created a Cloud 9 workspace called ‘smartreferralwebproject’ of type node.js  

## Node.js & npm:

We wanted the latest version of node.js and npm installed. If not we needed to get an update.
    •	Navigate to your workspace directory
    •	Enter ‘node -v’ 
        o	‘v.6.11.2’
    •	Enter ‘npm -v’ 
        o	‘3.10.10

## Angular CLI

The Angular team created a tool that did some of the scaffolding of the project and its library dependencies. We use it to scaffold our application for Angular use. The link is below 
https://github.com/angular/angular-cli

Installing 
    •	$ npm install -g angular-cli
        o	Make sure the install was clean
    •	$ ng new smartreferralweb 
        o	Will create application ‘smartreferralweb’  
    •	$ cd smartreferralweb (in Cloud 9 the workspace is at the project root already) 

Install Test:
From your application directory on the command line enter ‘$ ng serve’. 
This should run the built-in app if one was generated for you. 

Upgrade - Angular 4.4.5
Since we want to use the ‘angular-2-dropdown-multiselect’ to add skills to a candidate we need to upgrade from our current 2.4.10 to 4.0.0. We used the site below to upgrade.
http://angularjs.blogspot.com.au/2017/03/angular-400-now-available.html

    •	npm install @angular/{common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router,animations}@latest typescript@latest –save

The command above updates the package.json file in the application. 
But it comes with a price. The price of progress. The compiler will fail now 
complaining about issues with web packs. At the same time there are messages 
that ‘angular cli’ has now been replaced with @angular/cli 
    •	Fix the @angular/cli issue
        o	Uninstall old version
            	‘npm uninstall -g angular-cli’
            	‘npm uninstall –save-dev angular-cli’
            	‘npm clean cache’
        o	Install new @angular/cli
            	‘npm install -g @angular/cli@latest’
            	‘npm install –save-dev @angular/cli@latest
            	‘npm install’


## Install ‘angular-2-dropdown-multiselect’:

We are using a nice multi-select control for adding skills to candidates. 
This requires the following install.

https://github.com/softsimon/angular-2-dropdown-multiselect

    •	Dependency initialization
        o	Upgrade zone.js 
            	npm install zone.js@0.8.4 –save
        o	Get bootstrap 4 (CSS Styles)
            	‘npm install bootstrap@4.0.0-alpha.6 -–save-dev’
            	‘require(‘bootstrap’) will load all of Bootstap’s JQuery plugins into the JQuery object
        o	Get Font Awesome (a full suite of pictographic icons for easy scalable vector graphics on websites (version 4.7.0)
        o	‘npm install font-awesome’
    •	‘npm install angular-2-dropdown-multiselect


## Application Modules

    •	App
        o	‘app-module.ts’ 
            	Configuration and bootstrapping the smartreferralweb app
        o	‘app-component.ts’
            	The main component and class for the smartreferralweb app
        o	‘app-component.html’
            	The main view for the smartreferralweb app
        o	‘netcore2.service.ts’
            	A service that handles all data requests including a .NET Core 2.0 Api
            	Imports script ‘rxjs/Rx’ and associated scripts for use of Observable Api calls
            	Performs REST http requests to .NET Core 2.0 Api ‘SmartReferralCore2Api’ with a ‘map’ callback option to return a response in json format
            	Handles data requests for candidate, skill, candidate skill. 
        o	‘route.ts’
            	Imports RouterModule to map templates to component classes for URL routing 
        	 
        o	Candidate 
            	‘candidate.ts’, ‘candidateHome.ts’, ‘candidateHome.html’, update.candidate.ts’, ‘update.candidate.html’, ‘delete.candidate.ts’, ‘delete.candidate.html’
                •	Handle all candidate updates via reactive forms using ‘FormBuilder’. Uses service ‘netcore2.service.ts’ to handle all data requests/responses
        o	Skill 
            	‘skill.ts’, ‘skill.home.ts’, ‘skill.home.html‘, ‘update.skill.ts’ and ‘update.skill.html’
                •	Handle all skill updates via reactive forms using ‘FormBuilder’. Uses service ‘netcore2.service.ts’ to handle all data requests/responses. 
            	‘update.skill.category.ts’, ‘update.skill.category.html’
                •	Handle all skill category updates via reactive forms using ‘FormBuilder’. Uses ‘netcore2.service.ts’ to handle all data requests/responses.
        o	Candidate-Skill
            	‘candidate.skill.ts’, ‘candidate.skill.home.ts’, ‘candidate.skill.home.html’, ‘delete.candidte.skill.ts’, ‘delete.candidate.skill.html’
                •	Same as above
            	‘update.candidate.skill.ts’, ‘update.candidate.skill.html’
                •	Includes a multi-select dropdown control for adding one or more skills at a time. Skills loaded to this control per candidate will retrieve all skills that do not currently exist in the candidate’s skill list. 
        o	Reports
            	‘candidate.report.ts’
                •	Display a list of candidates with points for all of the criteria categories and a point total that adds those up. 
                •	Uses a sortable table by name or total points
            	‘skill.match.ts’
                •	Allow multiple selection of skills to search. Search button will send json array of skill IDs to retrieve candidate skills then iterate through the results adding up the total skill match count.
                •	Display a list of candidates sortable by skill match percentage. It will calculate a percentage using the skill match count for each obtained above.
                •	Display candidate detail with skills and contact info.			

