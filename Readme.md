# Tenant Management System (TMS)

The Tenant Management System (TMS) is a web-based application intended to overcome inefficiencies in traditional tenant management procedures, which are sometimes time-consuming and unproductive. The project’s goal is to design an online application that simplifies tenant management responsibilities while providing a seamless experience for both homeowners and tenants. TMS aims to streamline the operations of monitoring tenant information. It also manages maintenance requests in order to save time and reduce manual work.

## Setup

First, clone the repository.

```
git clone https://github.com/shazzad5709/tenant-ms.git
```

Then, install the dependencies on the frontend.

```
cd frontend
npm install
```

Finally, on a new terminal, create a virtual environment for the backend and install the dependencies.

```
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## How to run

On one terminal, run the following commands for the frontend.

```
cd frontend
npm run dev
```

On a new terminal, run the following commands for the backend.

```
cd backend
.venv\Scripts\Activate.ps1
uvicorn main:app --reload
```
