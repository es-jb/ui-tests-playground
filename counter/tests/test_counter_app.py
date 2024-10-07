import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver


class CounterPage:
    COUNTER_VALUE = (By.ID, "counter-value")
    PLUS_BUTTON = (By.CSS_SELECTOR, "button svg[data-icon='plus']")
    MINUS_BUTTON = (By.CSS_SELECTOR, "button svg[data-icon='minus']")

    def __init__(self, driver: WebDriver):
        self.driver = driver

    def load(self, url):
        self.driver.get(url)

    def get_counter_value(self):
        return int(self.driver.find_element(*self.COUNTER_VALUE).text)

    def click_plus(self):
        self.driver.find_element(*self.PLUS_BUTTON).click()

    def click_minus(self):
        self.driver.find_element(*self.MINUS_BUTTON).click()


class TestCounterApp:
    @pytest.fixture(autouse=True)
    def initialize(self, browser, base_url):
        self.counter_page = CounterPage(browser)
        self.counter_page.load(base_url)

    def test_initial_counter_value(self):
        assert self.counter_page.get_counter_value() == 0

    def test_increment_counter(self):
        initial_value = self.counter_page.get_counter_value()
        self.counter_page.click_plus()
        assert self.counter_page.get_counter_value() == initial_value + 1

    def test_decrement_counter(self):
        initial_value = self.counter_page.get_counter_value()
        self.counter_page.click_minus()
        assert self.counter_page.get_counter_value() == initial_value - 1
