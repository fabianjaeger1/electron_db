import abc


class BaseContentScanner(abc.ABC):
    def __init__(self):
        ...

    @abc.abstractmethod
    def get_text_content(self) -> str:
        ...
