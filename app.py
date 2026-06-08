import io

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import streamlit as st
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


THEME = {
    "blue": "#0ea5e9",
    "blue_dark": "#0369a1",
    "blue_soft": "#e0f2fe",
    "purple": "#8b5cf6",
    "purple_dark": "#7c3aed",
    "purple_soft": "#f5f3ff",
    "red": "#ef4444",
    "red_dark": "#dc2626",
    "red_soft": "#fee2e2",
    "ink": "#0f172a",
    "muted": "#64748b",
    "line": "#e2e8f0",
    "surface": "#ffffff",
    "surface_soft": "#f8fafc",
}


def configure_page():
    st.set_page_config(
        page_title="Machine Learning Portfolio",
        page_icon="ML",
        layout="wide",
        initial_sidebar_state="expanded",
    )
    st.markdown(
        f"""
        <style>
        .block-container {{
            max-width: 1240px;
            padding-top: 1.25rem;
            padding-bottom: 3rem;
        }}

        .stApp {{
            background:
                radial-gradient(circle at 18% 8%, rgba(14, 165, 233, 0.09), transparent 28rem),
                radial-gradient(circle at 86% 10%, rgba(139, 92, 246, 0.08), transparent 27rem),
                linear-gradient(180deg, #ffffff 0%, #f8fbff 42%, #f7f9fc 100%);
            color: {THEME["ink"]};
        }}

        [data-testid="stSidebar"] {{
            background:
                linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.98));
            border-right: 1px solid {THEME["line"]};
            box-shadow: 12px 0 30px rgba(15, 23, 42, 0.04);
        }}

        [data-testid="stSidebar"] h1 {{
            color: {THEME["ink"]};
            font-size: 1.25rem;
            font-weight: 900;
        }}

        [data-testid="stSidebar"] .stSlider label,
        [data-testid="stSidebar"] .stNumberInput label {{
            color: #334155;
            font-weight: 800;
        }}

        [data-testid="stMetric"] {{
            background: #ffffff;
            border: 1px solid {THEME["line"]};
            border-radius: 16px;
            padding: 1.05rem 1.1rem;
            box-shadow: 0 14px 34px rgba(15, 23, 42, 0.07);
            position: relative;
            overflow: hidden;
        }}

        [data-testid="stMetric"]::before {{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 4px;
            background: linear-gradient(90deg, {THEME["blue"]}, {THEME["purple"]});
        }}

        [data-testid="stMetricValue"] {{
            color: {THEME["ink"]};
            font-weight: 900;
        }}

        [data-testid="stMetricLabel"] {{
            color: {THEME["muted"]};
            font-weight: 800;
        }}

        .hero-card, .panel-card {{
            background: #ffffff;
            border: 1px solid {THEME["line"]};
            border-radius: 18px;
            box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
            margin-bottom: 1.15rem;
        }}

        .hero-card {{
            background:
                radial-gradient(circle at 14% 18%, rgba(14, 165, 233, 0.15), transparent 31%),
                radial-gradient(circle at 88% 20%, rgba(239, 68, 68, 0.07), transparent 28%),
                linear-gradient(145deg, #ffffff 0%, #f4fbff 48%, #fbf7ff 100%);
            padding: 2.2rem 2.25rem;
            position: relative;
            overflow: hidden;
        }}

        .hero-card::after {{
            background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.34), rgba(139, 92, 246, 0.26), transparent);
            content: "";
            height: 1px;
            left: 10%;
            position: absolute;
            right: 10%;
            top: 0;
        }}

        .hero-grid {{
            align-items: center;
            display: grid;
            gap: 2rem;
            grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
        }}

        .hero-eyebrow {{
            color: {THEME["blue_dark"]};
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-size: 0.78rem;
        }}

        .hero-title {{
            color: {THEME["ink"]};
            font-size: 3.05rem;
            line-height: 1.05;
            font-weight: 900;
            margin: 0.45rem 0 0.75rem;
        }}

        .gradient-word {{
            background: linear-gradient(115deg, #0284c7 0%, #7c3aed 58%, #ef4444 118%);
            -webkit-background-clip: text;
            color: transparent;
        }}

        .hero-copy {{
            color: {THEME["muted"]};
            font-size: 1.06rem;
            line-height: 1.7;
            margin-bottom: 1.2rem;
            max-width: 760px;
        }}

        .accent-row {{
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
        }}

        .pill {{
            border-radius: 999px;
            border: 1px solid rgba(14, 165, 233, 0.2);
            background: rgba(255, 255, 255, 0.82);
            color: #334155;
            display: inline-flex;
            font-weight: 800;
            padding: 0.45rem 0.78rem;
        }}

        .pill.red {{
            border-color: rgba(239, 68, 68, 0.26);
            color: #b91c1c;
        }}

        .hero-visual {{
            background:
                linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.86));
            border: 1px solid rgba(226, 232, 240, 0.9);
            border-radius: 18px;
            box-shadow: 0 26px 80px rgba(15, 23, 42, 0.13);
            padding: 1rem;
        }}

        .hero-visual-bar {{
            align-items: center;
            border-bottom: 1px solid {THEME["line"]};
            display: flex;
            gap: 0.4rem;
            padding: 0.1rem 0 0.8rem;
        }}

        .dot {{
            border-radius: 999px;
            display: block;
            height: 0.62rem;
            width: 0.62rem;
        }}

        .dot.blue {{ background: {THEME["blue"]}; }}
        .dot.purple {{ background: {THEME["purple"]}; }}
        .dot.red {{ background: {THEME["red"]}; }}

        .hero-stat {{
            align-items: center;
            background: #ffffff;
            border: 1px solid {THEME["line"]};
            border-radius: 14px;
            display: grid;
            gap: 0.85rem;
            grid-template-columns: auto 1fr;
            margin-top: 0.8rem;
            padding: 0.85rem;
            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.05);
        }}

        .stat-icon {{
            border-radius: 13px;
            display: grid;
            font-size: 1rem;
            font-weight: 900;
            height: 2.45rem;
            place-items: center;
            width: 2.45rem;
        }}

        .stat-icon.blue {{
            background: {THEME["blue_soft"]};
            color: {THEME["blue_dark"]};
        }}

        .stat-icon.purple {{
            background: {THEME["purple_soft"]};
            color: {THEME["purple_dark"]};
        }}

        .stat-icon.red {{
            background: {THEME["red_soft"]};
            color: {THEME["red_dark"]};
        }}

        .stat-title {{
            color: {THEME["ink"]};
            font-size: 0.94rem;
            font-weight: 900;
        }}

        .stat-copy {{
            color: {THEME["muted"]};
            font-size: 0.78rem;
            margin-top: 0.08rem;
        }}

        .panel-card {{
            padding: 1.35rem 1.45rem;
        }}

        .panel-card h2, .panel-card h3 {{
            color: {THEME["ink"]};
            font-weight: 900;
        }}

        .section-label {{
            color: {THEME["muted"]};
            font-size: 0.82rem;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            margin-bottom: 0.3rem;
        }}

        .red-focus {{
            color: {THEME["red_dark"]};
            font-weight: 900;
        }}

        div[data-testid="stDataFrame"] {{
            border: 1px solid {THEME["line"]};
            border-radius: 14px;
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.045);
            overflow: hidden;
        }}

        .stDownloadButton button {{
            background: linear-gradient(135deg, {THEME["blue"]}, {THEME["purple"]});
            border: 0;
            border-radius: 999px;
            box-shadow: 0 10px 24px rgba(14, 165, 233, 0.22);
            color: #ffffff;
            font-weight: 900;
        }}

        .stDownloadButton button:hover {{
            border: 0;
            box-shadow: 0 14px 30px rgba(14, 165, 233, 0.28);
            color: #ffffff;
        }}

        .crisp-grid {{
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
        }}

        .crisp-card {{
            background: #ffffff;
            border: 1px solid {THEME["line"]};
            border-top: 5px solid {THEME["blue"]};
            border-radius: 16px;
            box-shadow: 0 14px 34px rgba(15, 23, 42, 0.07);
            min-height: 220px;
            padding: 1rem;
        }}

        .crisp-card:nth-child(even) {{
            border-top-color: {THEME["purple"]};
        }}

        .crisp-card:nth-child(3n) {{
            border-top-color: {THEME["red"]};
        }}

        .crisp-number {{
            background: #e0f2fe;
            border-radius: 999px;
            color: {THEME["blue_dark"]};
            display: inline-flex;
            font-weight: 900;
            justify-content: center;
            margin-bottom: 0.75rem;
            padding: 0.35rem 0.7rem;
        }}

        .crisp-title {{
            color: {THEME["ink"]};
            font-weight: 900;
            margin-bottom: 0.45rem;
        }}

        .crisp-text {{
            color: #475569;
            font-size: 0.92rem;
            line-height: 1.55;
        }}

        @media (max-width: 900px) {{
            .crisp-grid {{
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }}
            .hero-grid {{
                grid-template-columns: 1fr;
            }}
            .hero-title {{
                font-size: 2.25rem;
            }}
        }}

        @media (max-width: 640px) {{
            .crisp-grid {{
                grid-template-columns: 1fr;
            }}
            .hero-title {{
                font-size: 1.65rem;
            }}
            .hero-card {{
                padding: 1.45rem;
            }}
        }}
        </style>
        """,
        unsafe_allow_html=True,
    )


def render_hero():
    st.markdown(
        """
        <section class="hero-card">
            <div class="hero-grid">
                <div>
                    <div class="hero-eyebrow">Data Science Portfolio</div>
                    <div class="hero-title">Machine Learning <span class="gradient-word">Dashboard</span></div>
                    <div class="hero-copy">
                        A Streamlit companion to the GitHub Pages site, built for
                        regression diagnostics, outlier review, model metrics,
                        raw data export, and CRISP-DM storytelling.
                        <span class="red-focus">Outliers stay visible.</span>
                    </div>
                    <div class="accent-row">
                        <span class="pill">Linear Regression</span>
                        <span class="pill">MAE / MSE / RMSE / R²</span>
                        <span class="pill red">Top 10 Outliers</span>
                        <span class="pill">CRISP-DM</span>
                    </div>
                </div>
                <aside class="hero-visual">
                    <div class="hero-visual-bar">
                        <span class="dot blue"></span>
                        <span class="dot purple"></span>
                        <span class="dot red"></span>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-icon blue">01</div>
                        <div>
                            <div class="stat-title">Interactive controls</div>
                            <div class="stat-copy">Tune data volume, noise, slope, and outliers.</div>
                        </div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-icon purple">02</div>
                        <div>
                            <div class="stat-title">Model diagnostics</div>
                            <div class="stat-copy">Compare fit quality with regression metrics.</div>
                        </div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-icon red">03</div>
                        <div>
                            <div class="stat-title">Outlier spotlight</div>
                            <div class="stat-copy">Rank high-residual records for inspection.</div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
        """,
        unsafe_allow_html=True,
    )


def collect_sidebar_options():
    st.sidebar.title("Dashboard Controls")
    st.sidebar.caption("Tune the synthetic dataset and inspect how outliers affect the fitted line.")

    return {
        "sample_size": st.sidebar.slider("Sample size", 20, 200, 80, 5),
        "slope": st.sidebar.slider("True slope", -10.0, 10.0, 2.5, 0.1),
        "intercept": st.sidebar.slider("True intercept", -30.0, 50.0, 10.0, 1.0),
        "noise": st.sidebar.slider("Noise level", 0.0, 50.0, 15.0, 1.0),
        "outlier_count": st.sidebar.slider("Outlier count", 0, 15, 3, 1),
        "seed": st.sidebar.number_input("Random seed", min_value=1, max_value=9999, value=42, step=1),
    }


def build_regression_data(sample_size, slope, intercept, noise, outlier_count, seed):
    rng = np.random.default_rng(seed)
    normal_count = sample_size - outlier_count

    normal_x = np.linspace(5, 95, normal_count) if normal_count else np.array([])
    normal_y = slope * normal_x + intercept + rng.normal(0, noise, normal_count)

    outlier_x = rng.uniform(10, 90, outlier_count) if outlier_count else np.array([])
    outlier_direction = np.where(np.arange(outlier_count) % 2 == 0, 1, -1)
    outlier_shift = outlier_direction * (noise + 35 + rng.uniform(0, 30, outlier_count))
    outlier_y = slope * outlier_x + intercept + outlier_shift

    x = np.concatenate([normal_x, outlier_x])
    y = np.concatenate([normal_y, outlier_y])
    outlier_flag = np.array([False] * normal_count + [True] * outlier_count)

    model = LinearRegression()
    model.fit(x.reshape(-1, 1), y)
    prediction = model.predict(x.reshape(-1, 1))
    residual = y - prediction

    data = pd.DataFrame(
        {
            "X": x,
            "Actual Y": y,
            "Predicted Y": prediction,
            "Residual": residual,
            "Absolute Error": np.abs(residual),
            "Outlier": np.where(outlier_flag, "Yes", "No"),
        }
    )
    data = data.sort_values("X", ignore_index=True).round(4)

    metrics = {
        "MAE": mean_absolute_error(y, prediction),
        "MSE": mean_squared_error(y, prediction),
        "RMSE": np.sqrt(mean_squared_error(y, prediction)),
        "R2": r2_score(y, prediction),
        "slope": float(model.coef_[0]),
        "intercept": float(model.intercept_),
    }
    return data, metrics


def render_metrics(metrics):
    cols = st.columns(4)
    metric_items = [
        ("MAE", metrics["MAE"], "Average absolute prediction error."),
        ("MSE", metrics["MSE"], "Average squared prediction error."),
        ("RMSE", metrics["RMSE"], "Prediction error in the original unit."),
        ("R²", metrics["R2"], "Share of variance explained by the model."),
    ]

    for col, (label, value, help_text) in zip(cols, metric_items):
        col.metric(label, f"{value:.4f}", help=help_text)


def render_regression_chart(data, metrics):
    st.markdown('<div class="panel-card">', unsafe_allow_html=True)
    st.markdown('<div class="section-label">Model View</div>', unsafe_allow_html=True)
    st.subheader("Linear Regression Chart")
    st.caption(
        f"Fitted line: y = {metrics['slope']:.3f}x + {metrics['intercept']:.3f}"
    )

    normal = data[data["Outlier"] == "No"]
    outliers = data[data["Outlier"] == "Yes"]
    line_x = np.array([0, 100])
    line_y = metrics["slope"] * line_x + metrics["intercept"]

    fig, ax = plt.subplots(figsize=(10.8, 5.9))
    ax.scatter(
        normal["X"],
        normal["Actual Y"],
        color=THEME["blue"],
        edgecolor="#ffffff",
        linewidth=0.8,
        alpha=0.82,
        s=54,
        label="Normal",
    )
    ax.scatter(
        outliers["X"],
        outliers["Actual Y"],
        color=THEME["red"],
        edgecolor="#ffffff",
        linewidth=0.9,
        alpha=0.92,
        s=82,
        label="Outlier",
    )
    ax.plot(line_x, line_y, color=THEME["purple"], linewidth=3.2, label="Regression Line")
    ax.set_xlabel("X")
    ax.set_ylabel("Actual Y")
    ax.set_xlim(0, 100)
    ax.grid(True, color=THEME["line"], linewidth=0.9, alpha=0.82)
    ax.legend(loc="best")
    ax.set_facecolor("#ffffff")
    fig.patch.set_facecolor("#ffffff")
    for spine in ax.spines.values():
        spine.set_color(THEME["line"])
    st.pyplot(fig, clear_figure=True)
    st.markdown("</div>", unsafe_allow_html=True)


def render_outlier_summary(data):
    st.markdown('<div class="panel-card">', unsafe_allow_html=True)
    st.markdown('<div class="section-label">Outlier Display</div>', unsafe_allow_html=True)
    st.subheader("Top 10 Outlier Observations")
    st.caption("Rows are ranked by absolute residual after fitting the regression line.")

    top_outliers = data.sort_values("Absolute Error", ascending=False).head(10).copy()
    top_outliers.insert(0, "Rank", range(1, len(top_outliers) + 1))
    st.dataframe(top_outliers, use_container_width=True, hide_index=True)
    st.markdown("</div>", unsafe_allow_html=True)


def render_raw_data(data):
    st.markdown('<div class="panel-card">', unsafe_allow_html=True)
    st.markdown('<div class="section-label">Dataset</div>', unsafe_allow_html=True)
    st.subheader("Raw Data")

    csv_buffer = io.StringIO()
    data.to_csv(csv_buffer, index=False)
    st.download_button(
        "Download CSV",
        data=csv_buffer.getvalue(),
        file_name="linear_regression_portfolio_data.csv",
        mime="text/csv",
        use_container_width=True,
    )
    st.dataframe(data, use_container_width=True, hide_index=True, height=420)
    st.markdown("</div>", unsafe_allow_html=True)


def render_crisp_dm():
    stages = [
        (
            "01",
            "Business Understanding",
            "Define the portfolio question: how does a simple model behave when data includes noise and outliers?",
        ),
        (
            "02",
            "Data Understanding",
            "Inspect feature values, target values, residuals, and outlier flags before trusting the fitted line.",
        ),
        (
            "03",
            "Data Preparation",
            "Generate a reproducible dataset with X, Actual Y, Predicted Y, Residual, Absolute Error, and Outlier columns.",
        ),
        (
            "04",
            "Modeling",
            "Fit a linear regression model and compare the learned slope and intercept with the sidebar controls.",
        ),
        (
            "05",
            "Evaluation",
            "Use MAE, MSE, RMSE, R2, and the Top 10 Outlier table to explain model quality and model risk.",
        ),
        (
            "06",
            "Deployment",
            "Pair a static GitHub Pages portfolio with this Streamlit app as an interactive backend-style showcase.",
        ),
    ]

    st.markdown('<div class="section-label">Workflow</div>', unsafe_allow_html=True)
    st.subheader("CRISP-DM")
    cards = [
        f"""
        <article class="crisp-card">
            <div class="crisp-number">{number}</div>
            <div class="crisp-title">{title}</div>
            <div class="crisp-text">{description}</div>
        </article>
        """
        for number, title, description in stages
    ]
    st.markdown(f'<section class="crisp-grid">{"".join(cards)}</section>', unsafe_allow_html=True)


def main():
    configure_page()
    options = collect_sidebar_options()
    data, metrics = build_regression_data(**options)

    render_hero()
    render_regression_chart(data, metrics)
    render_metrics(metrics)
    render_outlier_summary(data)
    render_raw_data(data)
    render_crisp_dm()


if __name__ == "__main__":
    main()
