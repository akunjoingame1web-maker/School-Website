# School Website - Kindergarten (TK Bali Global KInderschool)

Full-stack Python Flask web application for Kindergarten school management and public portal.

## Features
- **Public Portal**: Profile, News (Berita), Agenda/Events, Photo & Video Gallery, Contact & Interactive Map.
- **Online Admission System (SPMB)**: Interactive registration form with real-time feedback and data persistence.
- **Admin Dashboard**: Manage news announcements, agenda events, gallery uploads, and review student registration applications.
- **API Driven**: JSON storage backend powered by Python Flask.
- **Responsive Design**: Modern, mobile-first CSS with vibrant kindergarten aesthetic.

## Quick Start (VS Code)

1. **Activate Virtual Environment**:
   ```bash
   python -m venv venv
   ```setelah itu
   venv\Scripts\activate

   ```

2. **Move to school-website directory**:
   ```bash
   cd school-website
   ```

3. **Run the Application**:
   ```bash
   python app.py
   ```
   Open `http://127.0.0.1:5000` in your web browser.

## File Structure
- `app.py`: Main Flask application server and REST APIs.
- `data/`: Data storage files (JSON format).
- `public/`: HTML pages, CSS styles, and client-side JavaScript modules.
