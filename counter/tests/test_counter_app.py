import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver


class CounterPage:
    COUNTER_VALUE = (By.ID, "counter")
    PLUS_BUTTON = (By.XPATH, "//button[text()='+']")
    MINUS_BUTTON = (By.XPATH, "//button[text()='-']")

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
    URL = "http://localhost:3000"

    @pytest.fixture(autouse=True)
    def initialize(self, browser):
        self.counter_page = CounterPage(browser)
        self.counter_page.load(self.URL)

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
