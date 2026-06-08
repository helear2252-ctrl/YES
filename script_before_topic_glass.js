document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* --- Navbar Mobile Toggle --- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Toggle hamburger icon between menu and x
            if (navMenu.classList.contains('open')) {
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                menuIcon.setAttribute('data-lucide', 'menu');
            }
            
            // Re-create icons to reflect the change
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        // Close menu when clicking a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuIcon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }

    /* --- Active Navbar Link on Scroll --- */
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 120; // Offset for sticky navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Add scrolled background effect to navbar
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Toast Notification System --- */
    const toastContainer = document.getElementById('toast-container');

    function showToast(message) {
        if (!toastContainer) return;

        // Create Toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        // Add content (Lucide lock icon + text)
        toast.innerHTML = `
            <div class="toast-icon">
                <i data-lucide="lock"></i>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Render Lucide icon inside the new toast
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Trigger transition
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto remove after 3s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400); // Wait for transition out
        }, 3000);
    }

    /* --- 12 Algorithms Dataset --- */
    const topics = [
        {
            title: "線性迴歸 (Linear Regression)",
            principle: "線性迴歸透過建立自變數與因變數之間的線性關係來進行預測。模型訓練的核心是最小化預測值與真實值之間的<span class=\"highlight-red\">殘差平方和</span>，藉此尋找最符合資料分佈的最佳擬合直線。",
            example: "例如在房價預測中，以房屋坪數與地段作為特徵輸入，利用<span class=\"highlight-red\">最小平方法</span>計算出最佳的迴歸係數，進而精準推估未來的房屋銷售價格。",
            evaluation: "模型主要使用 R² (決定係數)、均方誤差 (MSE) 以及平均絕對誤差 (MAE) 來評估預測的精準度與殘差分佈。",
            mistake: "建模時常忽略特徵之間的<span class=\"highlight-red\">多重共線性</span>，這會導致模型係數估計極不穩定，並使統計檢定失效與解釋性下降。"
        },
        {
            title: "邏輯迴歸 (Logistic Regression)",
            principle: "邏輯迴歸常用於二分類任務。它將線性模型的輸出通過 Sigmoid 函數映射到 0 與 1 之間，將迴歸問題轉化為預測某事件發生機率的機率模型。",
            example: "例如在信用卡交易風險控制中，依據用戶消費地點、交易金額等特徵，預測該交易為欺詐交易（是/否）的機率分佈。",
            evaluation: "評估指標包括混淆矩陣、精確率、召回率、<span class=\"highlight-red\">F1-Score</span> 以及 ROC 曲線下的面積 <span class=\"highlight-red\">AUC</span> 值。",
            mistake: "在高維稀疏特徵下若未使用 L1/L2 <span class=\"highlight-red\">正則化</span>，容易使權重過大而產生嚴重的<span class=\"highlight-red\">過擬合</span>現象。"
        },
        {
            title: "決策樹 (Decision Trees)",
            principle: "決策樹透過樹狀結構對特徵進行多級分割。在每個節點，選擇使資料集不純度（如 Gini 指數或熵）下降最大、即資訊增益最高的特徵進行分支。",
            example: "在銀行客戶信貸評估中，依據客戶年收入、工作年資及負債比率進行分支，最終決定是否核發貸款。",
            evaluation: "通常藉由限制樹的最大深度、葉節點最小樣本數以及在測試集上的分類準確率來評估模型的表現。",
            mistake: "如果決策樹長得太深，模型會過度擬合訓練集中的噪音，造成嚴重的<span class=\"highlight-red\">過擬合</span>，必須進行剪枝優化。"
        },
        {
            title: "隨機森林 (Random Forests)",
            principle: "隨機森林是種集成學習算法。它透過自助法抽樣建立多棵決策樹，並在訓練過程中隨機選取特徵子集，最後以投票或平均方式輸出預測。",
            example: "在顧客流失預測中，隨機森林組合了數百棵不同的決策樹，能穩健處理包含複雜非線性關係的顧客特徵數據。",
            evaluation: "可利用隨機抽樣留下的未參與訓練樣本計算<span class=\"highlight-red\">袋外誤差</span> (Out-of-Bag Error) 來進行內建交叉驗證。",
            mistake: "雖然不易過擬合，但若未限制單棵樹深度，或特徵存在系統性偏差，模型仍可能無法有效泛化。"
        },
        {
            title: "梯度提升樹 (Gradient Boosting Trees)",
            principle: "梯度提升樹是一種加性模型，透過迭代訓練多個弱決策樹。每棵新樹都致力於擬合上一輪模型預測產生的殘差，沿著梯度的反方向逐步優化損失函數。",
            example: "在電子商務平台的廣告點擊率 (CTR) 預估中，利用 XGBoost 算法疊加多個弱決策樹，實現高效的特徵組合與預測。",
            evaluation: "通常藉由交叉驗證下的 LogLoss、預測準確率以及學習曲線的收斂速度來評估模型的收斂狀況與品質。",
            mistake: "若基模型過於複雜或迭代次數過多，極易導致<span class=\"highlight-red\">過擬合</span>，需要設定合理的學習率並搭配<span class=\"highlight-red\">Early Stopping</span>機制。"
        },
        {
            title: "支持向量機 (SVM)",
            principle: "支持向量機旨在特徵空間中尋找一個決策超平面，使得兩類樣本點到該超平面的最小幾何間距（Margin）最大化，從而獲得極佳的泛化能力。",
            example: "在醫學影像分類中，透過核函數將低維度非線性特徵投射到高維空間，以尋找劃分腫瘤良性與惡性的超平面。",
            evaluation: "評估指標包括測試集準確率、支援向量的數量比例，以及邊際寬度對雜訊的容忍程度。",
            mistake: "當選用太過複雜的非線性核函數，或懲罰參數 C 設得過大時，容易對雜訊敏感並導致模型<span class=\"highlight-red\">過擬合</span>。"
        },
        {
            title: "K-近鄰演算法 (KNN)",
            principle: "KNN 是一種惰性學習算法。當需要預測新樣本時，它在訓練集中找出距離最近的 K 個鄰居，並根據鄰居的類別進行投票或數值平均來得到預測值。",
            example: "在個性化影音推薦中，根據觀影記錄計算用戶間的相似度距離，找出最相似的 5 個鄰居，並推薦他們看過的熱門影片。",
            evaluation: "主要利用交叉驗證在測試集上的分類錯誤率來選取最合適的 K 值，並評估決策邊界的平滑度。",
            mistake: "在高維度空間下，樣本間的距離度量會失效，導致所有樣本距離趨於一致，這被稱為<span class=\"highlight-red\">維度災難</span>。"
        },
        {
            title: "單純貝氏分類器 (Naive Bayes)",
            principle: "單純貝氏基於貝氏定理，並做出一個極強的假設：所有輸入特徵在給定類別條件下彼此獨立。透過計算後驗機率來預測最可能的類別。",
            example: "垃圾郵件過濾系統中，統計各類辭彙在正常與垃圾郵件中出現的條件機率，藉以預估新收郵件是否為垃圾郵件。",
            evaluation: "在不平衡資料集下，常用精確率、召回率與 ROC-AUC 曲線來綜合衡量分類器在各機率閾值下的表現。",
            mistake: "當某個單字未出現在訓練集某類別中，其條件機率為零，會導致整體乘積歸零，必須使用<span class=\"highlight-red\">拉普拉斯平滑</span>修正。"
        },
        {
            title: "K-平均演算法 (K-Means Clustering)",
            principle: "K-Means 是一種無監督聚類演算法。它藉由反覆計算資料點與 K 個聚類中心間的歐氏距離，並將資料歸入最近的類別，隨後更新中心點直到收斂。",
            example: "在市場行銷的客群分析中，依據顧客的消費總額與購買頻率進行聚類，將顧客群體自動劃分為 K 個具代表性的細分市場。",
            evaluation: "藉由手肘法觀察群內平方和 (SSE) 的轉折，並計算<span class=\"highlight-red\">輪廓係數</span> (Silhouette Coefficient) 評估群組的緊密與分離度。",
            mistake: "對初始隨機中心點敏感，易陷入局部最佳解；且對於非球形分佈或大小差異極大的資料群落聚類效果不佳。"
        },
        {
            title: "主成分分析 (PCA)",
            principle: "PCA 是一種無監督特徵降維方法。它透過線性變換將高維資料正交投影到方差最大的新座標軸上，提取出互不相關的主成分來壓縮資料維度。",
            example: "在人臉辨識或多光譜影像處理中，將上萬維度的像素特徵壓縮為數十個代表性主成分，保留核心變異資訊並降低計算量。",
            evaluation: "藉由累積解釋變異比率（Scree Plot 碎石圖）來評估降維效果，決定保留多少個<span class=\"highlight-red\">PCA</span>主成分。",
            mistake: "因為 PCA 主要是線性特徵轉換，若資料包含複雜的非線性流形結構，降維過程會損失大量關鍵的非線性關係。"
        },
        {
            title: "綜合比較與核心評估方法總覽",
            principle: "各演算法在解釋性、運算速度與精度上各有優劣。線性模型可解釋性高但難擬合複雜非線性；決策樹集成模型精度高但運算繁重；降維技術如 <span class=\"highlight-red\">PCA</span> 與 <span class=\"highlight-red\">SVD</span> 則用於精簡特徵。",
            example: "在一個專案啟動時，先使用多種基準模型進行橫向比較與交叉驗證，以找出最適合特定業務場景的演算法。",
            evaluation: "迴歸任務使用 MSE/R²，分類使用精度、召回率與 <span class=\"highlight-red\">AUC</span>，聚類則以<span class=\"highlight-red\">輪廓係數</span>衡量。",
            mistake: "容易盲目追求複雜的深度學習模型，忽略了簡單模型的效率與可解釋性，或是由於特徵洩漏而在評估中掩蓋了<span class=\"highlight-red\">過擬合</span>。"
        },
        {
            title: "機器學習進階學習路徑指南",
            principle: "進階機器學習需要紮實的數學基礎，包括線性代數、微積分與機率論。理解矩陣分解如奇異值分解 (<span class=\"highlight-red\">SVD</span>) 等底層數學原理，是理解現代推薦與降維算法的基石。",
            example: "進階學習路徑包含特徵工程實務、深度學習架構、超參數自動優化，以及將模型推向生產環境所需的部署流程與監控。",
            evaluation: "可透過 Kaggle 競賽實戰、高難度開源專案重構，以及系統架構設計的完整度來評估進階技術實力。",
            mistake: "只注重理論推導而缺乏動手寫代碼能力，或者忽略了模型在實際上線後的維護、監控與更新，這是現代 <span class=\"highlight-red\">MLOps</span> 流程中常犯的重大疏漏。"
        }
    ];

    /* --- Topic Content Renderer --- */
    const algoContentDisplay = document.getElementById('algo-content-display');

    function renderTopic(index) {
        const topic = topics[index];
        if (!topic || !algoContentDisplay) return;

        // 1. Update active button state in the DOM
        const buttons = document.querySelectorAll('.algo-btn');
        buttons.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 2. Render content structure inside algo-content-display
        algoContentDisplay.innerHTML = `
            <div class="algo-display-header">
                <h3 class="display-title">${topic.title}</h3>
                <span class="display-status-badge">Phase 2 Active</span>
            </div>
            <div class="algo-content-display-body">
                <div class="topic-section-card">
                    <h4><i data-lucide="book-open"></i> 一、詳細原理</h4>
                    <p>${topic.principle}</p>
                </div>
                <div class="topic-section-card">
                    <h4><i data-lucide="code"></i> 二、實作例子</h4>
                    <p>${topic.example}</p>
                </div>
                <div class="topic-section-card">
                    <h4><i data-lucide="bar-chart-2"></i> 三、評估方法</h4>
                    <p>${topic.evaluation}</p>
                </div>
                <div class="topic-section-card">
                    <h4><i data-lucide="alert-triangle"></i> 四、常見錯誤</h4>
                    <p>${topic.mistake}</p>
                </div>
            </div>
        `;

        // 3. Re-create Lucide icons inside the rendered content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Bind event listeners to the 12 buttons
    const algoButtons = document.querySelectorAll('.algo-btn');
    algoButtons.forEach((button, idx) => {
        button.addEventListener('click', () => {
            renderTopic(idx);
        });
    });

    // Default: Render the first topic (Linear Regression)
    renderTopic(0);

    /* --- Linear Regression Interactive Demo --- */
    let regressionChart = null;
    let currentAnalysisData = [];

    function generateRegressionData(sampleSize, slope, intercept, noiseStrength, outlierCount) {
        const normalPoints = [];
        const outlierPoints = [];
        const normalCount = Math.max(0, sampleSize - outlierCount);

        // Generate normal points
        for (let i = 0; i < normalCount; i++) {
            // Distribute x evenly between 5 and 95
            const x = 5 + (90 * (i / Math.max(1, normalCount - 1)));
            // Add uniform noise approximation
            const noise = (Math.random() - 0.5) * noiseStrength * 2;
            const y = slope * x + intercept + noise;
            normalPoints.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
        }

        // Generate outlier points
        for (let i = 0; i < outlierCount; i++) {
            const x = 10 + Math.random() * 80;
            const yTrue = slope * x + intercept;
            
            // Deviate significantly in alternating positive and negative directions
            const direction = (i % 2 === 0) ? 1 : -1;
            const offset = (noiseStrength + 35 + Math.random() * 25) * direction;
            const y = yTrue + offset;
            
            outlierPoints.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
        }

        return { normalPoints, outlierPoints };
    }

    function fitLinearRegression(points) {
        const n = points.length;
        if (n === 0) return { slope: 0, intercept: 0 };

        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        for (let i = 0; i < n; i++) {
            const p = points[i];
            sumX += p.x;
            sumY += p.y;
            sumXY += p.x * p.y;
            sumXX += p.x * p.x;
        }

        const denominator = n * sumXX - sumX * sumX;
        if (denominator === 0) {
            return { slope: 0, intercept: sumY / n };
        }

        const m = (n * sumXY - sumX * sumY) / denominator;
        const b = (sumY - m * sumX) / n;
        return { slope: m, intercept: b };
    }

    function formatNumber(value, digits = 2) {
        return Number.isFinite(value) ? value.toFixed(digits) : '0.00';
    }

    function calculateMetrics(data) {
        const n = data.length;
        if (n === 0) {
            return { mae: 0, mse: 0, rmse: 0, r2: 0 };
        }

        const meanY = data.reduce((sum, row) => sum + row.y, 0) / n;
        const absoluteErrorSum = data.reduce((sum, row) => sum + Math.abs(row.error), 0);
        const squaredErrorSum = data.reduce((sum, row) => sum + row.error * row.error, 0);
        const totalSumSquares = data.reduce((sum, row) => sum + Math.pow(row.y - meanY, 2), 0);

        const mae = absoluteErrorSum / n;
        const mse = squaredErrorSum / n;
        const rmse = Math.sqrt(mse);
        const r2 = totalSumSquares === 0 ? 1 : 1 - (squaredErrorSum / totalSumSquares);

        return { mae, mse, rmse, r2 };
    }

    function updateMetricCards(metrics) {
        const metricsGrid = document.getElementById('metricsGrid');
        if (!metricsGrid) return;

        const cards = [
            { label: 'MAE', value: formatNumber(metrics.mae, 2), accent: 'metric-blue' },
            { label: 'MSE', value: formatNumber(metrics.mse, 2), accent: 'metric-purple' },
            { label: 'RMSE', value: formatNumber(metrics.rmse, 2), accent: 'metric-red' },
            { label: 'R²', value: formatNumber(metrics.r2, 4), accent: 'metric-purple' }
        ];

        metricsGrid.innerHTML = cards.map(card => `
            <div class="metric-card ${card.accent}">
                <span class="metric-label">${card.label}</span>
                <span class="metric-value">${card.value}</span>
            </div>
        `).join('');
    }

    function updateOutlierTable(data) {
        const tableBody = document.getElementById('outlierTableBody');
        if (!tableBody) return;

        const topRows = [...data]
            .sort((a, b) => Math.abs(b.error) - Math.abs(a.error))
            .slice(0, 10);

        tableBody.innerHTML = topRows.map((row, index) => `
            <tr class="${row.isOutlier ? 'outlier-highlight' : ''}">
                <td>${index + 1}</td>
                <td>${formatNumber(row.x, 2)}</td>
                <td>${formatNumber(row.y, 2)}</td>
                <td>${formatNumber(row.predictedY, 2)}</td>
                <td class="error-cell">${formatNumber(row.error, 2)}</td>
                <td>${row.isOutlier ? '<span class="highlight-red-badge">YES</span>' : '<span class="status-normal-badge">NO</span>'}</td>
            </tr>
        `).join('');
    }

    function updateRawDataTable(data) {
        const tableBody = document.getElementById('rawDataTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = data.map(row => `
            <tr class="${row.isOutlier ? 'outlier-highlight' : ''}">
                <td>${formatNumber(row.x, 2)}</td>
                <td>${formatNumber(row.y, 2)}</td>
                <td>${formatNumber(row.predictedY, 2)}</td>
                <td class="error-cell">${formatNumber(row.error, 2)}</td>
                <td>${row.isOutlier ? '<span class="highlight-red-badge">YES</span>' : '<span class="status-normal-badge">NO</span>'}</td>
            </tr>
        `).join('');
    }

    function escapeCsvValue(value) {
        const text = String(value);
        return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    }

    function downloadCSV() {
        if (!currentAnalysisData.length) return;

        const headers = ['X', 'Actual Y', 'Predicted Y', 'Error', 'Is Outlier'];
        const rows = currentAnalysisData.map(row => [
            formatNumber(row.x, 2),
            formatNumber(row.y, 2),
            formatNumber(row.predictedY, 4),
            formatNumber(row.error, 4),
            row.isOutlier ? 'YES' : 'NO'
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(escapeCsvValue).join(','))
            .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'linear_regression_data.csv';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function updateAllAnalysisOutputs() {
        const metrics = calculateMetrics(currentAnalysisData);
        updateMetricCards(metrics);
        updateOutlierTable(currentAnalysisData);
        updateRawDataTable(currentAnalysisData);
    }

    function updateRegressionDemo() {
        const sampleSizeElement = document.getElementById('range-samples');
        if (!sampleSizeElement) return; // Guard clause if elements are not on page

        const sampleSize = parseInt(sampleSizeElement.value);
        const slope = parseFloat(document.getElementById('range-slope').value);
        const intercept = parseFloat(document.getElementById('range-intercept').value);
        const noiseStrength = parseFloat(document.getElementById('range-noise').value);
        const outlierCount = parseInt(document.getElementById('range-outliers').value);

        // Update value labels
        document.getElementById('val-samples').textContent = sampleSize;
        document.getElementById('val-slope').textContent = slope.toFixed(1);
        document.getElementById('val-intercept').textContent = intercept;
        document.getElementById('val-noise').textContent = noiseStrength;
        document.getElementById('val-outliers').textContent = outlierCount;

        // Generate points
        const { normalPoints, outlierPoints } = generateRegressionData(
            sampleSize, slope, intercept, noiseStrength, outlierCount
        );

        // Fit line on ALL points
        const allPoints = [...normalPoints, ...outlierPoints];
        const fit = fitLinearRegression(allPoints);
        currentAnalysisData = [
            ...normalPoints.map(point => ({ ...point, isOutlier: false })),
            ...outlierPoints.map(point => ({ ...point, isOutlier: true }))
        ]
            .sort((a, b) => a.x - b.x)
            .map(point => {
                const predictedY = fit.slope * point.x + fit.intercept;
                const error = point.y - predictedY;
                return {
                    x: point.x,
                    y: point.y,
                    predictedY,
                    error,
                    isOutlier: point.isOutlier
                };
            });

        // Update statistics output
        document.getElementById('fit-slope').textContent = fit.slope.toFixed(2);
        document.getElementById('fit-intercept').textContent = fit.intercept.toFixed(2);

        // Generate line endpoints (for X in [0, 100])
        const linePoints = [
            { x: 0, y: parseFloat((fit.slope * 0 + fit.intercept).toFixed(2)) },
            { x: 100, y: parseFloat((fit.slope * 100 + fit.intercept).toFixed(2)) }
        ];

        // Update chart
        if (regressionChart) {
            regressionChart.data.datasets[0].data = normalPoints;
            regressionChart.data.datasets[1].data = outlierPoints;
            regressionChart.data.datasets[2].data = linePoints;
            regressionChart.update('none'); // Prevent update animations for smooth real-time drag
        }

        updateAllAnalysisOutputs();
    }

    function initRegressionDemo() {
        const ctx = document.getElementById('regression-chart');
        if (!ctx) return;

        // Add event listeners to all sliders
        const sliders = [
            'range-samples',
            'range-slope',
            'range-intercept',
            'range-noise',
            'range-outliers'
        ];

        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                slider.addEventListener('input', updateRegressionDemo);
            }
        });

        const downloadCsvBtn = document.getElementById('downloadCsvBtn');
        if (downloadCsvBtn) {
            downloadCsvBtn.addEventListener('click', downloadCSV);
        }

        // Initialize Chart.js scatter instance
        regressionChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: '正常資料點',
                        data: [],
                        backgroundColor: 'rgba(14, 165, 233, 0.75)',
                        borderColor: '#0ea5e9',
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: '離群值 (Outlier)',
                        data: [],
                        backgroundColor: 'rgba(239, 68, 68, 0.85)',
                        borderColor: '#ef4444',
                        pointRadius: 6,
                        pointHoverRadius: 8
                    },
                    {
                        label: '擬合迴歸線',
                        data: [],
                        type: 'line',
                        borderColor: '#8b5cf6',
                        backgroundColor: 'transparent',
                        borderWidth: 3,
                        pointRadius: 0,
                        fill: false,
                        showLine: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: "'Outfit', 'Inter', sans-serif",
                                size: 12,
                                weight: '500'
                            },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `(${context.raw.x}, ${context.raw.y})`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: 0,
                        max: 100,
                        title: {
                            display: true,
                            text: '特徵 X',
                            font: {
                                family: "'Outfit', 'Inter', sans-serif",
                                size: 13,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.6)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '目標 Y',
                            font: {
                                family: "'Outfit', 'Inter', sans-serif",
                                size: 13,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.6)'
                        }
                    }
                }
            }
        });

        // Perform initial draw
        updateRegressionDemo();
    }

    // Launch the Regression demo
    initRegressionDemo();

    /* --- Temporary Placeholders Interactivity --- */
    // Trigger toast warning when interactive buttons in other sections are clicked
    const actionButtons = document.querySelectorAll('.btn-interactive, .btn-streamlit-trigger');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            // If it is just an anchor link, let standard scroll happen but show toast if it's streamlit
            if (href === '#interactive-demo') {
                // Let page scroll naturally
                return;
            }
            e.preventDefault();
            showToast('內容將於下一階段加入');
        });
    });
});
