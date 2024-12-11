# flowma-project

This repo contains the code for the Flowma interview project.

The project source consists of client & server applications. The client application is built with Angular.
The server application is built with Flask.The Angular application is a single page application that allow new users to register, and existing users to log in.
Once logged in, you can view a list of "documents". You can click on a document to view/edit it. You can also create new documents.

## Local Environment Setup

You can set up the local environment directly on the host computer
The prerequisites below apply to both cases

### Prerequisites

- node - latest version (at least v20)

### Local Environment Setup instructions

- Clone the repository: `git clone https://github.com/caseyrubano/floma-project.git`
- `cd floma-project`

- From /client, run `npm install`
- From /server, run `npm install`

- To start the server project, run `flask run`
- To start the client project, run `npx ng serve`
- Navigate to http://localhost:4200 in a browser to view the app
- You can register with any email address & password to get started
