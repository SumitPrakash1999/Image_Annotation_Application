# Image Annotation Application

## Overview
This application enables users to upload images and annotate them efficiently. It is designed to be user-friendly, supporting batch uploads and responsive design for accessibility on various devices.

## Features
- **Batch Image Upload**: Users can upload multiple images at once using a drag-and-drop interface or through a file selection dialog.
- **Image Annotation**: After upload, users can annotate images directly within the application. For multiple images uploaded, currently the application supports only group annotation of all the images to a set of annotations.
- **Responsive UI**: The application is responsive, making it functional on both desktop and mobile devices.
- **Bootstrap UI**: Enhanced interface using Bootstrap for a professional look and feel.
- **Data Management**: Due to the considerations about scalability and performance, MongoDB Atlas was used as it provides dynamic schema deployed on a cloud service, thus mitigating single point of failure.

## Technology Stack
- **Frontend**: HTML, CSS (Bootstrap), JavaScript (jQuery)
- **Backend**: Django (Python)
- **Database**: MongoDB
- **Additional Libraries/Plugins**: Select2 for enhanced multi-select dropdowns, Djongo for MongoDB integration.

## Installation Instructions

### Prerequisites:
- Python 3.7 or higher
- Django 3.1 or higher
- MongoDB 

### Environment Setup:
1. **Python Installation**:
   Ensure Python is installed on your system. If not, download and install it from [python.org](https://www.python.org/downloads/).
   ```bash
   python --version  # Check Python version, should be 3.7 or higher
2. **Virtual Environment**:
    It's recommended to use a virtual environment for Python packages.
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```
3. **Install Dependencies**:
    Install Django and other required packages using pip.
    ```python
    pip install django djongo djangorestframework
    ```

4. **MongoDB Setup**:
Ensure MongoDB is installed and running on your system. Instructions can be found on the MongoDB official documentation.

5. **Environment Variables**:
    Set up environment variables for sensitive data such as database credentials. Create a .env file in your project root and add:
    ```plaintext
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASS=your_db_password
    ```
## Running the Application

1. **Database Migration**:
    Apply database migrations using Django's manage.py utility.
    ```bash
    python manage.py migrate
    ```
2. **Run Server**:
    Start the Django development server.
    ```bash
    python manage.py runserver
    ```
3. **Access the Application**:
    Open a web browser and navigate to http://127.0.0.1:8000/ to start using the application.

## Application Screenshots

1. **Home Screen**
![Alt text](https://github.com/SumitPrakash1999/Image_Annotation_Application/assets/39858566/c2267e26-3858-4382-8789-f27c01905e73)

2. **Image Uploaded screen and popup**
![Alt text](https://github.com/SumitPrakash1999/Image_Annotation_Application/assets/39858566/40d3dcff-983d-4632-8410-1f737e5c5b9e)

3. **Annotation Sceen**
![Alt text](https://github.com/SumitPrakash1999/Image_Annotation_Application/assets/39858566/3bea5336-ecf9-4387-87ea-52f8b3a5c2ff)

4. **Annotation Selection**
![Alt text](https://github.com/SumitPrakash1999/Image_Annotation_Application/assets/39858566/48183c29-79d1-4e48-ba24-f446812e4d05)

5. **Annotations added and popup**
![Alt text](https://github.com/SumitPrakash1999/Image_Annotation_Application/assets/39858566/b1a20df1-ba0b-49f2-bcf4-eeb5feede5ac)



