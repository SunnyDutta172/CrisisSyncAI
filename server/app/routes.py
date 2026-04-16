from flask import Blueprint, request, jsonify
from .logic import compute_escape_path

main = Blueprint('main', __name__)


@main.route('/')
def home():
    return "Fire Escape API is running 🚀"


@main.route('/find-path', methods=['POST'])
def find_path():
    data = request.get_json()

    try:
        start = tuple(data['start'])
        fire = tuple(data['fire'])
        image_name = data.get('image', 'FlrMapThree.jpeg')

        image_path = f"static/floormaps/{image_name}"

        result = compute_escape_path(image_path, start, fire)

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        })