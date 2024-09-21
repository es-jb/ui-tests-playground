import pytest

from pages.counter_app import CounterPage


class TestCounterApp:
    URL = "http://localhost:3001"

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
