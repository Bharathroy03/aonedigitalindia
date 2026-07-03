import os
import json
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client
import resend

# ─── Load Environment variables ───────────────────────────────────────────────
load_dotenv()

app = Flask(__name__)
# Enable CORS for Next.js frontend (default port 3000)
CORS(app, resources={r"/api/*": {"origins": "*"}})

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("flask_backend")

# ─── Supabase Client Setup ────────────────────────────────────────────────────
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")

supabase: Client = None
if supabase_url and supabase_key:
    try:
        supabase = create_client(supabase_url, supabase_key)
        logger.info("Successfully connected to Supabase client.")
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {str(e)}")

# ─── Resend Client Setup ──────────────────────────────────────────────────────
resend_api_key = os.environ.get("RESEND_API_KEY", "re_dummy")
resend.api_key = resend_api_key

# ─── JSON File Fallback Helpers ──────────────────────────────────────────────
def get_fallback_data(filename):
    """Reads local data JSON files as a fallback if Supabase query fails."""
    try:
        filepath = os.path.join(os.path.dirname(__file__), "..", "data", filename)
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data
    except Exception as e:
        logger.error(f"Fallback reading failed for {filename}: {str(e)}")
    return []

# ─── API endpoints ────────────────────────────────────────────────────────────

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "supabase_connected": supabase is not None}), 200

@app.route("/api/brands", methods=["GET"])
def get_brands():
    if supabase:
        try:
            res = supabase.table("brands").select("*").eq("active", True).order("order").execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase brands query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("brands.json")
    return jsonify(fallback)

@app.route("/api/categories", methods=["GET"])
def get_categories():
    if supabase:
        try:
            res = supabase.table("categories").select("*").eq("active", True).order("order").execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase categories query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("categories.json")
    return jsonify(fallback)

@app.route("/api/products", methods=["GET"])
def get_products():
    limit = request.args.get("limit", default=20, type=int)
    if supabase:
        try:
            res = supabase.table("products").select("*").eq("active", True).order("order").limit(limit).execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase products query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("products.json")
    return jsonify(fallback[:limit])

@app.route("/api/offers", methods=["GET"])
def get_offers():
    if supabase:
        try:
            # Simple select active offers
            res = supabase.table("offers").select("*").eq("active", True).order("order").execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase offers query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("offers.json")
    return jsonify(fallback)

@app.route("/api/testimonials", methods=["GET"])
def get_testimonials():
    if supabase:
        try:
            res = supabase.table("testimonials").select("*").eq("active", True).order("order").execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase testimonials query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("testimonials.json")
    return jsonify(fallback)

@app.route("/api/faq", methods=["GET"])
def get_faq():
    if supabase:
        try:
            res = supabase.table("faq").select("*").eq("active", True).order("order").execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase faq query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("faq.json")
    return jsonify(fallback)

@app.route("/api/gallery", methods=["GET"])
def get_gallery():
    if supabase:
        try:
            res = supabase.table("gallery").select("*").eq("active", True).order("order").execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase gallery query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("gallery.json")
    return jsonify(fallback)

@app.route("/api/socials", methods=["GET"])
def get_socials():
    if supabase:
        try:
            res = supabase.table("socials").select("*").eq("active", True).order("order").execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase socials query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("socials.json")
    return jsonify(fallback)

@app.route("/api/navigation", methods=["GET"])
def get_navigation_links():
    if supabase:
        try:
            res = supabase.table("navigation").select("*").eq("active", True).order("order").execute()
            if res.data:
                return jsonify(res.data)
        except Exception as e:
            logger.error(f"Supabase navigation query failed: {str(e)}")
    
    # Fallback
    fallback = get_fallback_data("navigation.json")
    # Wrap in main attribute structure matching json layout
    if isinstance(fallback, dict) and "main" in fallback:
        return jsonify(fallback["main"])
    return jsonify(fallback)

# ─── Submissions ──────────────────────────────────────────────────────────────

@app.route("/api/contact", methods=["POST"])
def post_contact():
    try:
        data = request.get_json() or {}
        
        # Simple validation
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        subject = data.get("subject")
        message = data.get("message")
        product = data.get("product")
        
        if not name or not email or not message:
            return jsonify({"success": False, "error": "Validation failed: name, email and message are required."}), 400

        # Honeypot check
        if data.get("honeypot"):
            return jsonify({"success": True, "message": "Spam blocked."}), 200

        # 1. Save to Supabase Submissions
        ref_id = None
        if supabase:
            try:
                sub_res = supabase.table("contact_submissions").insert({
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "subject": subject,
                    "message": message,
                    "product": product,
                    "status": "new"
                }).execute()
                if sub_res.data:
                    ref_id = sub_res.data[0].get("id")
            except Exception as e:
                logger.error(f"Supabase contact submission insert failed: {str(e)}")

        # 2. Dispatch Emails via Resend
        try:
            admin_email = os.environ.get("EMAIL_TO_ADMIN", "info@aonedigitalindia.com")
            email_from = os.environ.get("EMAIL_FROM", "info@aonedigitalindia.com")
            
            # Email to Admin
            resend.Emails.send({
                "from": f"Aone Digital India <noreply@aonedigitalindia.com>",
                "to": admin_email,
                "subject": f"📥 New Flask Customer Inquiry: {subject}",
                "reply_to": email,
                "html": f"<p><strong>Name:</strong> {name}</p><p><strong>Email:</strong> {email}</p><p><strong>Phone:</strong> {phone}</p><p><strong>Subject:</strong> {subject}</p><p><strong>Message:</strong></p><p>{message}</p>"
            })

            # Confirmation Email to Customer
            resend.Emails.send({
                "from": f"Aone Digital India <{email_from}>",
                "to": email,
                "subject": "We received your message — Aone Digital India",
                "html": f"<p>Hello {name},</p><p>We received your message regarding '{subject}'. Our product advisors will get back to you within 24 hours.</p><p>Aone Digital India Team</p>"
            })
        except Exception as e:
            logger.error(f"Resend email dispatch failed: {str(e)}")

        return jsonify({
            "success": True,
            "message": "Thank you! We will contact you within 24 hours.",
            "reference": f"AONE-{ref_id.split('-')[0].upper()}" if ref_id else "AONE-CRM"
        }), 200

    except Exception as e:
        logger.error(f"Unexpected contact API error: {str(e)}")
        return jsonify({"success": False, "error": "An internal server error occurred."}), 500

@app.route("/api/newsletter", methods=["POST"])
def post_newsletter():
    try:
        data = request.get_json() or {}
        email = data.get("email", "").lower().strip()
        name = data.get("name")
        
        if not email or "@" not in email:
            return jsonify({"success": False, "error": "A valid email address is required."}), 400

        # Save to Supabase Subscriptions
        if supabase:
            try:
                # Upsert subscriber
                supabase.table("newsletter_subscribers").upsert({
                    "email": email,
                    "name": name,
                    "status": "active"
                }, on_conflict="email").execute()
            except Exception as e:
                logger.error(f"Supabase newsletter upsert failed: {str(e)}")
                return jsonify({"success": False, "error": "Database error saving subscription."}), 500

        return jsonify({
            "success": True,
            "message": "Successfully subscribed! Thank you for joining Aone Digital India."
        }), 200

    except Exception as e:
        logger.error(f"Unexpected newsletter API error: {str(e)}")
        return jsonify({"success": False, "error": "Internal server error."}), 500

# ─── App Execution ────────────────────────────────────────────────────────────

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "True") == "True"
    logger.info(f"Starting Flask API Server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=debug)
