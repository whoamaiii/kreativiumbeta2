from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://127.0.0.1:4173/")

        # Expect the main heading to be visible
        heading = page.get_by_role("heading", name="Sensory Compass")
        expect(heading).to_be_visible()

        # Take a screenshot of the page
        page.screenshot(path="jules-scratch/verification/screenshot.png")

        browser.close()

if __name__ == "__main__":
    run()
