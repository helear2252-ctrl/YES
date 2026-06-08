import io

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import streamlit as st
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def inject_styles():
    st.markdown(
        """
        <style>
        :root {
            --blue: #0ea5e9;
            --blue-dark: #0369a1;
            --purple: #8b5cf6;
            --red: #ef4444;
            --ink: #0f172a;
            --muted: #64748b;
            --line: rgba(148, 163, 184, 0.22);
        }

        .stApp {
            background: linear-gradient(180deg, #ffffff 0%, #f8fbff 46%, #f7fafc 100%);
            color: var(--ink);
        }

        [data-testid="stSidebar"] {
            background: linear-gradient(180deg, #f8fafc, #f1f7fb);
            border-right: 1px solid var(--line);
        }

        .hero {
            padding: 2rem 2rem 1.8rem;
            border: 1px solid var(--line);
            border-radius: 20px;
            background:
                radial-gradient(circle at 12% 18%, rgba(14, 165, 233, 0.16), transparent 34%),
                radial-gradient(circle at 86% 18%, rgba(139, 92, 246, 0.14), transparent 32%),
                linear-gradient(135deg, #ffffff 0%, #f4fbff 55%, #fbf7ff 100%);
            box-shadow: 0 24px 60px rgba(15, 23, 42, 0.09);
            margin-bottom: 1.5rem;
        }

        .hero h1 {
            margin: 0;
            color: var(--ink);
            font-size: 2.4rem;
            line-height: 1.15;
            letter-spacing: 0;
        }

        .hero .subtitle {
            color: var(--muted);
            font-weight: 700;
            margin-top: 0.7rem;
            font-size: 1.05rem;
        }

        .hero .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.65rem;
            margin-top: 1.1rem;
        }

        .hero .tag {
            display: inline-flex;
            align-items: center;
            border: 1px solid rgba(14, 165, 233, 0.18);
            background: rgba(255, 255, 255, 0.82);
            color: #334155;
            border-radius: 999px;
            padding: 0.45rem 0.8rem;
            font-size: 0.86rem;
            font-weight: 800;
            box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);
        }

        .section-card {
            padding: 1.25rem;
            border: 1px solid var(--line);
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 16px 42px rgba(15, 23, 42, 0.07);
            margin-bottom: 1.25rem;
        }

        .metric-card {
            padding: 1rem;
            border-radius: 14px;
            border: 1px solid var(--line);
            background: #ffffff;
            box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
            border-left: 5px solid var(--blue);
        }

        .metric-card.purple {
            border-left-color: var(--purple);
        }

        .metric-card.red {
            border-left-color: var(--red);
        }

        .metric-label {
            color: var(--muted);
            font-size: 0.78rem;
            font-weight: 900;
            letter-spacing: 0.06em;
            text-transform: uppercase;
        }

        .metric-value {
            color: var(--ink);
            font-size: 1.7rem;
            font-weight: 900;
            margin-top: 0.2rem;
        }

        .crisp-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
        }

        .crisp-card {
            min-height: 245px;
            padding: 1.15rem;
            border: 1px solid var(--line);
            border-top: 5px solid var(--blue);
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 14px 36px rgba(15, 23, 42, 0.07);
        }

        .crisp-card:nth-child(even) {
            border-top-color: var(--purple);
        }

        .crisp-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.35rem;
            height: 2.35rem;
            border-radius: 50%;
            color: var(--blue-dark);
            background: #e0f2fe;
            font-weight: 900;
            margin-bottom: 0.7rem;
        }

        .crisp-card:nth-child(3n) .crisp-num {
            color: #b91c1c;
            background: #fee2e2;
        }

        .crisp-title {
            color: var(--ink);
            font-weight: 900;
            font-size: 1.02rem;
            margin-bottom: 0.45rem;
        }

        .crisp-use {
            margin-top: 0.75rem;
            padding: 0.75rem;
            border-radius: 10px;
            background: linear-gradient(135deg, #e0f2fe, #f5f3ff);
            color: #1e293b;
            font-size: 0.9rem;
        }

        @media (max-width: 900px) {
            .crisp-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .hero h1 {
                font-size: 2rem;
            }
        }

        @media (max-width: 640px) {
            .crisp-grid {
                grid-template-columns: 1fr;
            }

            .hero {
                padding: 1.35rem;
            }

            .hero h1 {
                font-size: 1.65rem;
            }
        }
        </style>
        """,
        unsafe_allow_html=True,
    )


def render_hero():
    st.markdown(
        """
        <section class="hero">
            <h1>機器學習十大演算法資料分析作品集</h1>
            <div class="subtitle">Linear Regression × Machine Learning × CRISP-DM × Data Visualization</div>
            <div class="tags">
                <span class="tag">互動式模型展示</span>
                <span class="tag">Outlier 分析</span>
                <span class="tag">CSV 匯出</span>
                <span class="tag">Streamlit 後端整合</span>
            </div>
        </section>
        """,
        unsafe_allow_html=True,
    )


def render_sidebar():
    st.sidebar.title("參數控制")
    st.sidebar.caption("調整後主畫面會即時更新。")

    sample_size = st.sidebar.slider("樣本數", min_value=20, max_value=200, value=80, step=1)
    slope = st.sidebar.slider("斜率", min_value=-10.0, max_value=10.0, value=2.5, step=0.1)
    intercept = st.sidebar.slider("截距", min_value=-30, max_value=50, value=10, step=1)
    noise = st.sidebar.slider("noise 雜訊強度", min_value=0, max_value=50, value=15, step=1)
    outlier_count = st.sidebar.slider("outlier 數量", min_value=0, max_value=15, value=3, step=1)

    return {
        "sample_size": sample_size,
        "slope": slope,
        "intercept": intercept,
        "noise": noise,
        "outlier_count": outlier_count,
    }


def build_regression_data(sample_size, slope, intercept, noise, outlier_count):
    rng = np.random.default_rng(42)
    normal_count = max(0, sample_size - outlier_count)

    normal_x = np.linspace(5, 95, normal_count) if normal_count else np.array([])
    normal_noise = rng.uniform(-noise, noise, normal_count)
    normal_y = slope * normal_x + intercept + normal_noise

    outlier_x = rng.uniform(10, 90, outlier_count) if outlier_count else np.array([])
    directions = np.where(np.arange(outlier_count) % 2 == 0, 1, -1)
    outlier_offsets = (noise + 35 + rng.uniform(0, 25, outlier_count)) * directions
    outlier_y = slope * outlier_x + intercept + outlier_offsets

    x = np.concatenate([normal_x, outlier_x])
    y = np.concatenate([normal_y, outlier_y])
    is_outlier = np.array([False] * normal_count + [True] * outlier_count)

    model = LinearRegression()
    model.fit(x.reshape(-1, 1), y)
    predicted_y = model.predict(x.reshape(-1, 1))
    error = y - predicted_y

    data = pd.DataFrame(
        {
            "X": np.round(x, 2),
            "Actual Y": np.round(y, 2),
            "Predicted Y": np.round(predicted_y, 4),
            "Error": np.round(error, 4),
            "Is Outlier": np.where(is_outlier, "YES", "NO"),
        }
    ).sort_values("X", ignore_index=True)

    metrics = {
        "mae": mean_absolute_error(y, predicted_y),
        "mse": mean_squared_error(y, predicted_y),
        "rmse": np.sqrt(mean_squared_error(y, predicted_y)),
        "r2": r2_score(y, predicted_y),
        "fit_slope": float(model.coef_[0]),
        "fit_intercept": float(model.intercept_),
    }

    return data, metrics


def render_chart(data, metrics):
    st.markdown('<div class="section-card">', unsafe_allow_html=True)
    st.subheader("Linear Regression Demo")
    st.caption(f"Fitted slope: {metrics['fit_slope']:.2f} | Fitted intercept: {metrics['fit_intercept']:.2f}")

    fig, ax = plt.subplots(figsize=(10, 5.6))
    normal = data[data["Is Outlier"] == "NO"]
    outliers = data[data["Is Outlier"] == "YES"]
    line_x = np.array([0, 100])
    line_y = metrics["fit_slope"] * line_x + metrics["fit_intercept"]

    ax.scatter(normal["X"], normal["Actual Y"], color="#0ea5e9", alpha=0.78, label="Normal", s=48)
    ax.scatter(outliers["X"], outliers["Actual Y"], color="#ef4444", alpha=0.88, label="Outlier", s=62)
    ax.plot(line_x, line_y, color="#8b5cf6", linewidth=3, label="Regression Line")
    ax.set_xlabel("X")
    ax.set_ylabel("Actual Y")
    ax.grid(True, color="#e2e8f0", linewidth=0.9)
    ax.legend(loc="best")
    ax.set_xlim(0, 100)
    ax.set_facecolor("#ffffff")
    fig.patch.set_facecolor("#ffffff")

    st.pyplot(fig, clear_figure=True)
    st.markdown("</div>", unsafe_allow_html=True)


def render_metrics(metrics):
    cols = st.columns(4)
    cards = [
        ("MAE", f"{metrics['mae']:.2f}", ""),
        ("MSE", f"{metrics['mse']:.2f}", "purple"),
        ("RMSE", f"{metrics['rmse']:.2f}", "red"),
        ("R²", f"{metrics['r2']:.4f}", "purple"),
    ]

    for col, (label, value, accent) in zip(cols, cards):
        with col:
            st.markdown(
                f"""
                <div class="metric-card {accent}">
                    <div class="metric-label">{label}</div>
                    <div class="metric-value">{value}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )


def render_outlier_table(data):
    st.markdown('<div class="section-card">', unsafe_allow_html=True)
    st.subheader("Top 10 Outlier Observations")

    table = data.copy()
    table["Absolute Error"] = table["Error"].abs()
    table = table.sort_values("Absolute Error", ascending=False).head(10).drop(columns=["Absolute Error"])
    table.insert(0, "Rank", range(1, len(table) + 1))

    st.dataframe(table, use_container_width=True, hide_index=True)
    st.markdown("</div>", unsafe_allow_html=True)


def render_raw_data(data):
    st.markdown('<div class="section-card">', unsafe_allow_html=True)
    st.subheader("Raw Data Table")

    csv_buffer = io.StringIO()
    data.to_csv(csv_buffer, index=False)

    st.download_button(
        label="下載目前資料 CSV",
        data=csv_buffer.getvalue(),
        file_name="linear_regression_data.csv",
        mime="text/csv",
        use_container_width=True,
    )
    st.dataframe(data, use_container_width=True, hide_index=True, height=420)
    st.markdown("</div>", unsafe_allow_html=True)


def render_crisp_dm_walkthrough():
    stages = [
        (
            "01",
            "Business Understanding",
            "定義資料分析目標與商業問題。",
            "建立一個能展示機器學習、互動分析與資料視覺化能力的作品集網站。",
        ),
        (
            "02",
            "Data Understanding",
            "觀察資料分布、資料品質與異常值。",
            "透過互動式線性迴歸資料，觀察樣本數、noise 與 outlier 對資料型態的影響。",
        ),
        (
            "03",
            "Data Preparation",
            "資料清理、特徵整理與資料轉換。",
            "前端與後端即時產生 X、Actual Y、Predicted Y、Error 與 Is Outlier 欄位。",
        ),
        (
            "04",
            "Modeling",
            "建立模型並觀察模型輸出。",
            "使用線性迴歸模型建立回歸線，觀察斜率、截距與噪音如何改變結果。",
        ),
        (
            "05",
            "Evaluation",
            "使用指標評估模型表現。",
            "使用 MAE、MSE、RMSE、R² 與 Top 10 Outlier Observations 評估預測結果。",
        ),
        (
            "06",
            "Deployment",
            "將分析成果部署成可互動使用的系統。",
            "前端可部署到 GitHub Pages，後端展示版可部署到 Streamlit Cloud。",
        ),
    ]

    st.subheader("CRISP-DM Process Walkthrough")
    cards = []
    for number, title, description, use_case in stages:
        cards.append(
            f"""
            <div class="crisp-card">
                <div class="crisp-num">{number}</div>
                <div class="crisp-title">{title}</div>
                <div>{description}</div>
                <div class="crisp-use"><strong>本專案用途</strong><br>{use_case}</div>
            </div>
            """
        )

    st.markdown(f'<div class="crisp-grid">{"".join(cards)}</div>', unsafe_allow_html=True)


def main():
    st.set_page_config(
        page_title="機器學習十大演算法資料分析作品集",
        page_icon="📊",
        layout="wide",
    )
    inject_styles()
    params = render_sidebar()
    data, metrics = build_regression_data(**params)

    render_hero()
    render_chart(data, metrics)
    render_metrics(metrics)
    render_outlier_table(data)
    render_raw_data(data)
    render_crisp_dm_walkthrough()


if __name__ == "__main__":
    main()
