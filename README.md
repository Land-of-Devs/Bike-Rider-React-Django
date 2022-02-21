# Bike Rider

Creators:

- [Fco. Javier Diez Garcia](https://github.com/JDiezGarcia)
- [Ivan Ferrer](https://github.com/iferrer20)
- [Juan Jose Paya](https://github.com/jjpaya)


Type: CFGS Proyect

School: IES L'Estacio

Degree: Web Applications Development

# Index
- [Bike Rider](#bike-rider)
- [Index](#index)
- [Introduction](#introduction)
- [Also see](#also-see)
- [Content](#content)
  - [Web](#web)
    - [HEADER WEB](#header-web)
    - [MAIN](#main)
    - [FOOTER](#footer)
  - [Panel](#panel)
    - [HEADER PANEL](#header-panel)
    - [TABPANEL](#tabpanel)
  - [Station](#station)
  - [Admin](#admin)
- [Technologies](#technologies)

# Introduction

What is Bike Rider?

It is a structured platform for renting bikes, send tickets, search the closest station and make a reservation. Also in the panel site, a MAINTENANCE user can search his supervised stations, see if any of the bike there have a ticket or the station it self have any, and can list all bikes with tickets on the road, a SUPPORT use can see all user tickets related and send a email to reply them. Admin and Super Admin can access Server Panel, but Admin only will have create, update (some), and  read permissions. A finally will have the STATION PANEL, that will allow to configure it, hook and unhook bikes, login and send tickets.

# Also see
Here you have a link with the installation tutorial:
[INSTALLATION](./INSTALL.md#Bike-Rider-install-and-configuration-steps).

And the document explaining the design of the application can be read here:
[DESIGN](./DESIGN.md).

# Content

## Web
| SECTION | FEATURES |
| - | - |
| Header |  Nav menu with all the pages. It will show menu links and ticket if you are logged into the web, if you aren't, only login button will be shown.|
| Main | This will contain a map with pins and a circumference to search stations|

> This section is the same in all the pages, except on Panel, Station and Admin that will disappear
***
### HEADER WEB
| SECTION | FEATURES |
| - | - |
| Ticket | Open a modal with a form to send tickets. |
| Menu Links | It will have all links to Panel ( If a user is log and have role SUPPORT O MAINTAINER ) or Admin (If a user is log and have role ). |
| Login | You have to click the button you can login or sign up . |
| Thumbnail | A menu to see your reservation, to change and see your subscription, another to use coupons and finally to logout. |
***
### MAIN
| Section | Features |
| - | - |
| Map | Only will show the map, with a circumference that you can move, then will show all the station on the circumference. If you click it, will show a pop up with the station info and a timer of reservations, if you're log it shows a button to do a booking. |
***
### FOOTER
| Section | Features |
| - | - |
| Terms and Condition | Link to a document of Terms and Condition |
| Cookie Terms | Link to a document of Cookie Terms |
> This section is only shown on web, in client site

## Panel
| Section | Features |
| - | - |
| Header | Button to go back |
| TabPanel| A tab with 2 option in Maintenance Role and 1 on Support  |
***
### HEADER PANEL
| Section | Features |
| - | - |
| Button | A button to go back to client site |
***
### TABPANEL
| Section | Features |
| - | - |
| Tabs | Three tabs to navigate between pages, only two to maintenance user and two  |
| Pages | Maintenance: First a map with all station supervised by the user maintainer and second a list with all the bikes on the road with their tickets and you can change status; Support: A list of all tickets, you can reply and send emails to their senders. |
> This section is only for Support and Maintenance Users
>
## Station
| Section | Features |
| - | - |
| Header | Once your log into the totem, you will see 2 buttons, to send a issue or logout and the name of the station. If your not log you only will see the name. |
| Main Screen | You will have the the login if is't a user log, but if is log it will show all the slots of the station, with the status of the bike and if they have a reservation. If the station isn't configure, will show a page to send the token. |
| Hardware Panel | You can hook the bikes and only if the slot is empty. |

> This section only can be configure by a maintainer.

## Admin
| Section | Features |
| - | - |
| Permissions Group | Only Admin and SuperAdmins are allow, the admins only have Read, Update (In some tables), Create(In some tables) and Delete (Only on Coupon Table) |
| Content | We have all tables, with custom fields and forms with custom heads. |
> This section is only for Admins or Super Admins
***

# Technologies

* [NodeJS](https://nodejs.org/): Version 14.0.0
* [Docker](https://www.docker.com/): Version 20.10.7
* [Nginx](http://nginx.org/): Version 1.21.5
* [React.js](https://reactjs.org/): Version 17.0.2
* [MUI](https://mui.com/): Version 5.3.0
* [SASS](https://sass-lang.com/): Version 1.49.0
* [Django](https://www.djangoproject.com/): Version 4.0.2
* [Python](https://www.python.org/): Version 3
* [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript): Version ES6
* [Postgres](https://www.postgresql.org/): Version 14.1
* [PGAdmin](https://www.pgadmin.org/): Version 4
