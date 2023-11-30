from typing import Optional

import pandas as pd

from evidently.base_metric import InputData
from evidently.base_metric import Metric
from evidently.base_metric import MetricResult
from evidently.calculations.recommender_systems import get_curr_and_ref_df
from evidently.metrics.recsys.base_top_k import TopKMetricRenderer
from evidently.options.base import AnyOptions
from evidently.renderers.base_renderer import default_renderer


class HitRateKMetricResult(MetricResult):
    k: int
    current: pd.Series
    reference: Optional[pd.Series] = None


class HitRateKMetric(Metric[HitRateKMetricResult]):
    k: int
    min_rel_score: Optional[int]
    no_feedback_users: bool

    def __init__(
        self, k: int, min_rel_score: Optional[int] = None, no_feedback_users: bool = False, options: AnyOptions = None
    ) -> None:
        self.k = k
        self.min_rel_score = min_rel_score
        self.no_feedback_users = no_feedback_users
        super().__init__(options=options)

    def get_values(self, df, max_k):
        user_num = df.users.nunique()
        res = []
        for k in range(1, max_k + 1):
            df_k = df[(df.target == 1) & (df.preds <= k)]
            res.append(df_k.users.nunique() / user_num)
        return pd.Series(index=[x for x in range(1, max_k + 1)], data=res)

    def calculate(self, data: InputData) -> HitRateKMetricResult:
        curr, ref = get_curr_and_ref_df(data, self.min_rel_score, self.no_feedback_users, True)
        max_k = min(curr["preds"].max(), max(10, self.k))
        current = self.get_values(curr, max_k)
        reference: Optional[pd.Series] = None
        if ref is not None:
            reference = self.get_values(ref, max_k)
        return HitRateKMetricResult(k=self.k, reference=reference, current=current)


@default_renderer(wrap_type=HitRateKMetric)
class PrecisionTopKMetricRenderer(TopKMetricRenderer):
    yaxis_name = "HitRate@k"
    header = "Hit Rate"
