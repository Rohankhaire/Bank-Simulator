# ATM Simulator Application

A comprehensive ATM Simulator built with Java and Swing, featuring a PostgreSQL backend for secure transaction management and user data persistence.

![ATM Simulator Screenshot](src/icons/logo.jpg)

## Features

- **User Authentication**: Secure Login and Multi-step Signup process.
- **Transaction Management**: 
  - Cash Deposit
  - Cash Withdrawal
  - Fast Cash options
- **Account Services**:
  - Balance Inquiry
  - Mini Statement generation
  - PIN Change functionality
- **Modern UI**: Built using Java Swing with a user-friendly interface.

## Technology Stack

- **Language**: Java
- **Database**: PostgreSQL
- **GUI Framework**: Java Swing & AWT
- **Libraries**: 
  - JDBC (PostgreSQL Driver)
  - JCalendar (for date selection)

## Prerequisites

- Java Development Kit (JDK) 8 or higher
- PostgreSQL Server installed and running
- JDBC Driver for PostgreSQL

## Setup and Installation

1. **Database Setup**:
   - Create a database named `bankmanagementsystem`.
   - Update the connection details in `src/atm/simulator/application/Conn.java`.
   - (Optional) Run the necessary SQL scripts to setup tables (login, signup, transactions, etc.).

2. **Running the Application**:
   - You can run the application directly using the provided `run.bat` file (Windows).
   - Alternatively, compile and run `atm.simulator.application.Login`.

## Execution

To run the application, ensure you have Java in your system path and execute:

```bash
run.bat
```

## Project Structure

- `src/`: Contains the Java source code.
- `icons/`: Image assets used in the application.
- `dist/`: Compiled JAR files and dependencies.
- `build.xml`: Ant build script for NetBeans.
