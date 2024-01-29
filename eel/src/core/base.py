import abc

import numpy as np


class BaseEmbeddingsComparator(abc.ABC):
    @classmethod
    @abc.abstractmethod
    def get_similarity_confidence(
        cls, vector1: np.ndarray, vector2: np.ndarray
    ) -> float:
        ...


class BaseContentScanner(abc.ABC):
    def __init__(self):
        ...

    @abc.abstractmethod
    def get_text_content(self) -> str:
        ...
