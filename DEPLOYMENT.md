# 🚀 ATM Simulator - Deployment Guide

## 📦 Distribution Package

This Java desktop application can be distributed as a standalone package that users can download and run on their computers.

## 🎯 Deployment Options

### Option 1: GitHub Releases (Recommended)

1. **Create a Release on GitHub:**
   - Go to your repository: https://github.com/Rohankhaire/Bank-Simulator
   - Click on "Releases" (right sidebar)
   - Click "Create a new release"
   - Tag version: `v1.0.0`
   - Release title: `ATM Simulator v1.0.0`
   - Upload the distribution package (see below)

2. **Prepare Distribution Package:**
   ```bash
   # Create a zip file of the dist folder
   cd "e:\Desktop\NetBeansProjects\Bank Simulator"
   Compress-Archive -Path dist\* -DestinationPath ATM-Simulator-v1.0.0.zip
   ```

3. **Upload to Release:**
   - Attach `ATM-Simulator-v1.0.0.zip` to the release
   - Add release notes describing features
   - Publish the release

### Option 2: Direct Download from Repository

Users can clone the repository and run the application:

```bash
git clone https://github.com/Rohankhaire/Bank-Simulator.git
cd Bank-Simulator/dist
java -jar "Atm_Simulator_Application.jar"
```

### Option 3: Executable (.exe) for Windows

You already have `ATM-1.0.exe` in your project root. This can be:
- Uploaded to GitHub Releases
- Shared directly with users
- Distributed via cloud storage (Google Drive, Dropbox, etc.)

## 📋 User Requirements

Users need to have installed:
- **Java Runtime Environment (JRE) 8 or higher**
- **PostgreSQL Database** (for full functionality)

## 🔧 Database Setup for Users

Include these instructions for users:

1. Install PostgreSQL
2. Create a database named `bankmanagementsystem`
3. Update connection details in the application (if needed)
4. Run the application

## 📱 Running the Application

### Windows:
- **Option 1:** Double-click `ATM-1.0.exe`
- **Option 2:** Run `run.bat`
- **Option 3:** Command line:
  ```cmd
  cd dist
  java -jar "Atm_Simulator_Application.jar"
  ```

### Linux/Mac:
```bash
cd dist
java -jar "Atm_Simulator_Application.jar"
```

## 🌐 Web Version

If you want to make this accessible online, consider:

1. **Convert to Web Application:**
   - Rewrite using JavaServer Faces (JSF) or Spring Boot
   - Deploy to cloud platforms (Heroku, AWS, Azure)

2. **Remote Desktop Solution:**
   - Host on a server
   - Users access via Remote Desktop Protocol (RDP)

3. **Java Web Start (Deprecated):**
   - Not recommended for new deployments

## 📦 Distribution Checklist

- [ ] Test the JAR file on a clean machine
- [ ] Ensure all dependencies are in the `dist/lib` folder
- [ ] Create comprehensive README with setup instructions
- [ ] Include database setup scripts
- [ ] Create GitHub Release with downloadable package
- [ ] Add screenshots/demo video to README
- [ ] Document system requirements
- [ ] Include troubleshooting guide

## 🔗 Useful Links

- **Repository:** https://github.com/Rohankhaire/Bank-Simulator
- **Issues:** https://github.com/Rohankhaire/Bank-Simulator/issues
- **Releases:** https://github.com/Rohankhaire/Bank-Simulator/releases

## 📞 Support

For issues or questions, please open an issue on GitHub.
