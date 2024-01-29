from spacy import language

from src.core import base
from src.indexer import embeddings


class SemanticChunksGenerator:
    def __init__(
        self,
        comparator: base.BaseEmbeddingsComparator,
        text_processing_pipeline: language.Language,
        embeddings_generator: embeddings.EmbeddingsGenerator,
        grouping_similarity_threshold: float = 0.75,
    ):
        self._comparator = comparator
        self._text_processing_pipeline = text_processing_pipeline
        self._embeddings_generator = embeddings_generator
        self._grouping_similarity_threshold = grouping_similarity_threshold

    def _split_sentences(self, text: str) -> list[str]:
        doc = self._text_processing_pipeline(text)
        sentences = [sent.text for sent in doc.sents]
        return sentences

    def _group_sentences_semantically(
        self, sentences: list[str], threshold_confidence: float
    ) -> list[str]:
        segments = []

        start_idx = 0
        end_idx = 1
        segment = [sentences[start_idx]]
        while end_idx < len(sentences):
            embedding1 = self._embeddings_generator.get_embedding(sentences[start_idx])
            embedding2 = self._embeddings_generator.get_embedding(sentences[end_idx])
            if (
                self._comparator.get_similarity_confidence(embedding1, embedding2)
                >= threshold_confidence
            ):
                segment.append(sentences[end_idx])
            else:
                segments.append(" ".join(segment))
                start_idx = end_idx
                segment = [sentences[start_idx]]
            end_idx += 1

        if segment:
            segments.append(" ".join(segment))

        return segments

    def split_text(self, text: str) -> list[str]:
        sentences = self._split_sentences(text)
        return self._group_sentences_semantically(
            sentences, self._grouping_similarity_threshold
        )
