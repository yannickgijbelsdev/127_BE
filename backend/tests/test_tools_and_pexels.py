"""
Backend tests for the 127 IT Library review request:
- Tool status endpoint fail-open behavior (known & unknown tool IDs).
- Pexels proxy endpoints (photos + videos) + server-side caching.
- Static SEO assets (robots.txt, sitemap.xml) reachable.
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback to frontend .env parse (BASE_URL must be provided)
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip()
                break

BASE_URL = BASE_URL.rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Accept": "application/json"})
    return s


# ---------------- Tool status endpoint ----------------

class TestToolStatusFailOpen:
    KNOWN_TOOLS = ["dpd", "printer", "sscreen", "wea", "password"]

    @pytest.mark.parametrize("tool_id", KNOWN_TOOLS)
    def test_known_tool_status_200_and_enabled(self, api, tool_id):
        r = api.get(f"{BASE_URL}/api/tools/{tool_id}/status", timeout=15)
        assert r.status_code == 200, f"Expected 200 for {tool_id}, got {r.status_code} body={r.text[:200]}"
        data = r.json()
        assert data.get("id") == tool_id
        assert data.get("enabled") is True, f"Tool {tool_id} should be enabled but got {data}"

    def test_unknown_tool_status_fail_open(self, api):
        """This is the core of the reported bug: unknown tool id should NOT return 404."""
        r = api.get(f"{BASE_URL}/api/tools/doesnotexist/status", timeout=15)
        assert r.status_code == 200, (
            f"Unknown tool should fail-open with 200, got {r.status_code}: {r.text[:200]}"
        )
        data = r.json()
        assert data.get("enabled") is True
        assert data.get("id") == "doesnotexist"


# ---------------- Pexels proxy ----------------

class TestPexelsProxy:
    def test_photos_ok(self, api):
        r = api.get(
            f"{BASE_URL}/api/pexels/photos",
            params={"query": "technology", "per_page": 5, "page": 1},
            timeout=20,
        )
        assert r.status_code == 200, f"Photos endpoint status={r.status_code} body={r.text[:200]}"
        data = r.json()
        assert "photos" in data, f"Response missing 'photos' key: {data}"
        assert isinstance(data["photos"], list)

    def test_photos_cache_second_call(self, api):
        # Second identical call should also succeed (may be served from cache)
        start = time.time()
        r = api.get(
            f"{BASE_URL}/api/pexels/photos",
            params={"query": "technology", "per_page": 5, "page": 1},
            timeout=20,
        )
        elapsed = time.time() - start
        assert r.status_code == 200
        data = r.json()
        assert "photos" in data
        print(f"Second photos call elapsed: {elapsed:.2f}s")

    def test_videos_ok(self, api):
        r = api.get(
            f"{BASE_URL}/api/pexels/videos",
            params={"query": "technology", "per_page": 5, "page": 1},
            timeout=20,
        )
        assert r.status_code == 200, f"Videos endpoint status={r.status_code} body={r.text[:200]}"
        data = r.json()
        assert "videos" in data, f"Response missing 'videos' key: {data}"
        assert isinstance(data["videos"], list)

    def test_videos_cache_second_call(self, api):
        r = api.get(
            f"{BASE_URL}/api/pexels/videos",
            params={"query": "technology", "per_page": 5, "page": 1},
            timeout=20,
        )
        assert r.status_code == 200
        assert "videos" in r.json()


# ---------------- Static SEO assets ----------------

class TestSeoAssets:
    def test_robots_txt(self, api):
        r = api.get(f"{BASE_URL}/robots.txt", timeout=15)
        assert r.status_code == 200, f"robots.txt status={r.status_code}"
        assert "User-agent" in r.text

    def test_sitemap_xml(self, api):
        r = api.get(f"{BASE_URL}/sitemap.xml", timeout=15)
        assert r.status_code == 200, f"sitemap.xml status={r.status_code}"
        assert "<urlset" in r.text
