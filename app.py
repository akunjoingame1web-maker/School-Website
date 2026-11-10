from flask import Flask, render_template, request, jsonify, send_from_directory, redirect, url_for
import os
import json
from datetime import datetime

app = Flask(__name__, static_folder='public', static_url_path='')

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def read_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        return []
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def write_json(filename, data):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Web Routes
@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/profil')
def profil():
    return send_from_directory('public', 'profil.html')

@app.route('/berita')
def berita():
    return send_from_directory('public', 'berita.html')

@app.route('/agenda')
def agenda():
    return send_from_directory('public', 'agenda.html')

@app.route('/galeri')
def galeri():
    return send_from_directory('public', 'galeri.html')

@app.route('/spmb')
def spmb():
    return send_from_directory('public', 'spmb.html')

@app.route('/kontak')
def kontak():
    return send_from_directory('public', 'kontak.html')

@app.route('/admin')
def admin():
    return send_from_directory('public', 'admin.html')

# REST API Endpoints
@app.route('/api/news', methods=['GET', 'POST', 'DELETE'])
def api_news():
    news_list = read_json('news.json')
    if request.method == 'GET':
        return jsonify(news_list)
    elif request.method == 'POST':
        data = request.json
        new_item = {
            "id": len(news_list) + 1,
            "title": data.get("title", ""),
            "date": datetime.now().strftime("%Y-%m-%d"),
            "category": data.get("category", "Pengumuman"),
            "summary": data.get("summary", ""),
            "content": data.get("content", "")
        }
        news_list.insert(0, new_item)
        write_json('news.json', news_list)
        return jsonify({"success": True, "item": new_item})
    elif request.method == 'DELETE':
        item_id = request.args.get('id', type=int)
        news_list = [n for n in news_list if n.get('id') != item_id]
        write_json('news.json', news_list)
        return jsonify({"success": True})

@app.route('/api/events', methods=['GET', 'POST', 'DELETE'])
def api_events():
    events_list = read_json('events.json')
    if request.method == 'GET':
        return jsonify(events_list)
    elif request.method == 'POST':
        data = request.json
        new_event = {
            "id": len(events_list) + 1,
            "title": data.get("title", ""),
            "date": data.get("date", ""),
            "time": data.get("time", ""),
            "location": data.get("location", ""),
            "description": data.get("description", "")
        }
        events_list.append(new_event)
        write_json('events.json', events_list)
        return jsonify({"success": True, "item": new_event})
    elif request.method == 'DELETE':
        item_id = request.args.get('id', type=int)
        events_list = [e for e in events_list if e.get('id') != item_id]
        write_json('events.json', events_list)
        return jsonify({"success": True})

@app.route('/api/gallery', methods=['GET', 'POST', 'DELETE'])
def api_gallery():
    gallery_list = read_json('gallery.json')
    if request.method == 'GET':
        return jsonify(gallery_list)
    elif request.method == 'POST':
        data = request.json
        new_media = {
            "id": len(gallery_list) + 1,
            "title": data.get("title", ""),
            "type": data.get("type", "photo"),
            "url": data.get("url", ""),
            "caption": data.get("caption", "")
        }
        gallery_list.append(new_media)
        write_json('gallery.json', gallery_list)
        return jsonify({"success": True, "item": new_media})
    elif request.method == 'DELETE':
        item_id = request.args.get('id', type=int)
        gallery_list = [g for g in gallery_list if g.get('id') != item_id]
        write_json('gallery.json', gallery_list)
        return jsonify({"success": True})

@app.route('/api/spmb', methods=['POST'])
def api_spmb_submit():
    data = request.json
    admissions = read_json('admissions.json')
    
    reg_code = f"SPMB-2026-{(len(admissions) + 1):03d}"
    submission = {
        "id": 100 + len(admissions) + 1,
        "registration_code": reg_code,
        "child_name": data.get("child_name"),
        "dob": data.get("dob"),
        "gender": data.get("gender"),
        "parent_name": data.get("parent_name"),
        "phone": data.get("phone"),
        "email": data.get("email"),
        "program": data.get("program"),
        "status": "Menunggu Verifikasi",
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    admissions.insert(0, submission)
    write_json('admissions.json', admissions)
    return jsonify({"success": True, "registration_code": reg_code, "submission": submission})

@app.route('/api/spmb/submissions', methods=['GET'])
def api_spmb_submissions():
    admissions = read_json('admissions.json')
    return jsonify(admissions)

@app.route('/api/spmb/config', methods=['GET', 'POST'])
def api_spmb_config():
    if request.method == 'GET':
        config = read_json('spmb-config.json')
        return jsonify(config)
    elif request.method == 'POST':
        new_config = request.json
        write_json('spmb-config.json', new_config)
        return jsonify({"success": True, "config": new_config})

@app.errorhandler(404)
def page_not_found(e):
    return send_from_directory('public', '404.html'), 404

if __name__ == '__main__':
    print("TK Bali Global KInderschool Server running on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
