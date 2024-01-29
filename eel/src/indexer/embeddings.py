import numpy as np
import sentence_transformers

from src.core import base


class CosineEmbeddingsComparator(base.BaseEmbeddingsComparator):
    @staticmethod
    def _get_adjusted_cosine_similarity(
        vector1: np.ndarray, vector2: np.ndarray
    ) -> float:
        """
        :return: similarity value: 0 - similar, 1 - opposite, 2 - de-correlated
        """
        result = 1 - np.dot(vector1, vector2) / (
            np.linalg.norm(vector1) * np.linalg.norm(vector2)
        )

        # To avoid float precision issue, we have to double-check if the result value lays withing expected limits
        if 0 <= result <= 2:
            return result

        if result < 0:
            return 0

        if result > 2:
            return 2

    @classmethod
    def get_similarity_confidence(
        cls, vector1: np.ndarray, vector2: np.ndarray
    ) -> float:
        """
        :param adjusted_cosine_value: Equals to (1 - Cosine) and ranges from 0 to 2
        :return: value ranges from 0 to 1, where 1 - similar, 0 - opposite, 0.5 - de-correlated
        """

        adjusted_cosine_value = cls._get_adjusted_cosine_similarity(
            vector1=vector1, vector2=vector2
        )
        return 1 - adjusted_cosine_value / 2


class EmbeddingsGenerator:
    def __init__(self, encoder_model: sentence_transformers.SentenceTransformer):
        self._encoder_model = encoder_model

    def get_embedding(self, sentence: str) -> np.ndarray:
        return self._encoder_model.encode(sentences=sentence)
