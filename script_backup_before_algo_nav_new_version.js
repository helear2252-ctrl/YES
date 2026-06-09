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
            title: "線性迴歸",
            principle: "線性迴歸用一條直線描述自變數與連續目標值之間的關係，模型會尋找讓預測值與真實值距離最小的係數。訓練核心通常是最小化<span class=\"highlight-red\">殘差平方和</span>，並透過<span class=\"highlight-red\">最小平方法</span>得到最佳擬合線。",
            example: "以房價預測為例，可以用坪數、屋齡、距離捷運站時間等特徵預測成交價格。模型會學出每個特徵對價格的影響方向與幅度，適合做基準模型與可解釋性分析。",
            evaluation: "常用 MAE、MSE、RMSE 與 R² 評估預測誤差與解釋能力，也可以觀察殘差圖是否呈現隨機分佈。若殘差有明顯結構，代表模型可能漏掉非線性或重要特徵。",
            mistake: "常見錯誤是忽略特徵之間的<span class=\"highlight-red\">多重共線性</span>，導致係數不穩定；也有人把相關性誤解成因果關係，或在未檢查離群值的情況下直接解讀模型。"
        },
        {
            title: "邏輯迴歸",
            principle: "邏輯迴歸雖然名稱有迴歸，但主要用於分類問題。它會把線性組合輸入 Sigmoid 函數，轉換成 0 到 1 之間的機率，再依照門檻判斷類別。",
            example: "在客戶流失預測中，可以用登入頻率、消費金額、客服紀錄與使用天數預測是否流失。輸出機率能協助行銷團隊排序高風險客戶，而不是只給出是或否。",
            evaluation: "分類任務常用 Accuracy、Precision、Recall、<span class=\"highlight-red\">F1-Score</span>、ROC 曲線與 <span class=\"highlight-red\">AUC</span> 評估。若類別不平衡，應優先觀察 Recall、Precision 與 F1-Score。",
            mistake: "常見錯誤是直接使用 0.5 當固定門檻，卻沒有根據商業成本調整；也容易忽略特徵標準化與 L1/L2 <span class=\"highlight-red\">正則化</span>，導致模型泛化能力下降。"
        },
        {
            title: "決策樹",
            principle: "決策樹透過一連串 if-else 條件切分資料，每次切分都希望讓節點內的資料更純。分類樹常用 Gini 或 Entropy，迴歸樹則常用平方誤差降低量。",
            example: "在信用審核中，決策樹可以依照收入、負債比、信用分數與工作年資建立規則，例如先判斷負債比，再判斷信用分數，最後輸出核准或拒絕。",
            evaluation: "分類樹可用混淆矩陣、Precision、Recall 與 F1-Score；迴歸樹可用 MAE、RMSE 與 R²。也應檢查樹深度、葉節點樣本數與交叉驗證表現。",
            mistake: "最常見問題是樹長得太深而產生<span class=\"highlight-red\">過擬合</span>。若沒有設定 max_depth、min_samples_leaf 或剪枝，模型會記住訓練資料雜訊，導致測試集表現不穩。"
        },
        {
            title: "隨機森林",
            principle: "隨機森林是多棵決策樹的集成方法，透過 Bootstrap 抽樣與隨機特徵選取建立差異化的樹，再用投票或平均降低單棵樹的不穩定性。",
            example: "在疾病風險預測中，隨機森林可以同時處理年齡、檢驗數值、生活習慣與病史欄位，並用特徵重要度協助理解哪些因素最影響預測。",
            evaluation: "除了測試集指標，也可利用未被某棵樹抽中的樣本估計<span class=\"highlight-red\">袋外誤差</span>，快速觀察泛化表現。分類看 AUC、F1-Score，迴歸看 RMSE 與 R²。",
            mistake: "常見錯誤是只增加樹的數量，卻不調整 max_features、max_depth 或葉節點限制。隨機森林較穩健，但仍可能在資料洩漏或特徵偏誤下產生錯誤結論。"
        },
        {
            title: "梯度提升樹",
            principle: "梯度提升樹會逐步建立許多弱學習器，每一棵新樹都專注修正前面模型的錯誤。它透過損失函數的梯度方向更新模型，因此能捕捉複雜非線性關係。",
            example: "在廣告點擊率預測中，梯度提升樹可以整合使用者行為、裝置、時間與內容特徵，學習不同條件組合下的點擊機率，常見實作包含 XGBoost、LightGBM 與 CatBoost。",
            evaluation: "分類任務可看 LogLoss、AUC、F1-Score；迴歸任務可看 MAE、RMSE。訓練時應觀察驗證集曲線，並使用 <span class=\"highlight-red\">Early Stopping</span> 控制最佳迭代次數。",
            mistake: "常見錯誤是 learning_rate 太高、樹太深或迭代次數過多，造成<span class=\"highlight-red\">過擬合</span>。若沒有驗證集與 Early Stopping，很容易得到訓練分數漂亮但實務表現不穩的模型。"
        },
        {
            title: "支持向量機",
            principle: "支持向量機會尋找能最大化類別間隔的決策邊界，離邊界最近的資料點稱為支持向量。搭配 Kernel 技巧後，也能把非線性問題映射到高維空間處理。",
            example: "在文字分類或影像特徵分類中，SVM 可用 TF-IDF 或抽取後的向量特徵判斷類別。當資料量中等、特徵維度較高時，SVM 往往能得到穩定表現。",
            evaluation: "分類結果可用 Accuracy、Precision、Recall、F1-Score 與 AUC 評估。若使用不同 Kernel，應透過交叉驗證比較 C、gamma 與 kernel 設定。",
            mistake: "常見錯誤是沒有標準化特徵，導致距離與間隔計算被大尺度欄位支配；另外在高維資料中若調參不足，也可能遇到<span class=\"highlight-red\">維度災難</span>與過擬合。"
        },
        {
            title: "K-近鄰演算法",
            principle: "KNN 是基於距離的懶學習方法，預測時會尋找與新資料最接近的 K 個訓練樣本，再用投票或平均決定結果。模型幾乎不訓練，但預測時計算成本較高。",
            example: "在商品推薦中，可以根據使用者的瀏覽、購買與評分特徵，尋找最相似的一群使用者，再推薦他們喜歡的商品給新使用者。",
            evaluation: "分類可用 Accuracy、F1-Score；迴歸可用 MAE、RMSE。選擇 K 值時應用驗證集或交叉驗證，並比較不同距離度量，例如 Euclidean、Manhattan 或 Cosine。",
            mistake: "常見錯誤是沒有做特徵標準化，讓尺度大的欄位主導距離；在特徵很多時，距離差異會變得不明顯，容易出現<span class=\"highlight-red\">維度災難</span>。"
        },
        {
            title: "單純貝氏分類器 Naive Bayes",
            principle: "Naive Bayes 根據貝氏定理計算各類別的後驗機率，並假設特徵在給定類別後彼此條件獨立。這個假設雖然簡化，但在文字分類中非常有效率。",
            example: "在垃圾郵件偵測中，可以把郵件文字轉成詞頻特徵，再計算某些詞出現在垃圾信或正常信中的機率，最後判斷新郵件最可能屬於哪一類。",
            evaluation: "常用混淆矩陣、Precision、Recall、<span class=\"highlight-red\">F1-Score</span> 與 <span class=\"highlight-red\">AUC</span> 評估。若用於文字分類，也可觀察錯分樣本，檢查是否有關鍵詞被斷詞或前處理錯誤影響。",
            mistake: "常見錯誤是忘記處理零機率問題，導致某些未出現過的詞讓整體機率歸零；也要注意特徵獨立假設不一定成立，模型解釋時不能過度放大單一詞的重要性。"
        },
        {
            title: "K-平均演算法 K-Means Clustering",
            principle: "K-Means 是非監督式分群方法，目標是把資料分成 K 群，讓每個點盡量接近自己的群中心。演算法會反覆分配樣本與更新中心，直到群中心穩定。",
            example: "在客戶分群中，可以用消費頻率、平均客單價與最近購買時間，把客戶分成高價值、沉睡、價格敏感等群組，協助制定不同行銷策略。",
            evaluation: "常用 SSE、Elbow Method 與 Silhouette Score 判斷群數與分群品質。也應搭配商業可解釋性，確認每一群是否能轉化成可執行的策略。",
            mistake: "常見錯誤是任意指定 K 值，或在資料未標準化時直接分群。K-Means 對初始中心與離群值敏感，若資料維度太高也容易受到<span class=\"highlight-red\">維度災難</span>影響。"
        },
        {
            title: "主成分分析 PCA",
            principle: "PCA 是降維方法，會尋找能保留最多資料變異的互相垂直方向，稱為主成分。它把原本多個相關特徵轉換成較少的新特徵，降低噪音與視覺化難度。",
            example: "在影像或問卷分析中，原始特徵可能很多且彼此相關。PCA 可以把高維資料壓縮成 2 到 3 個主成分，用於視覺化群集、加速模型或降低儲存成本。",
            evaluation: "常看 explained variance ratio、累積解釋變異量與 Scree Plot，判斷要保留幾個主成分。若降維後要接模型，仍需用下游任務指標確認表現是否穩定。",
            mistake: "常見錯誤是沒有先標準化特徵，讓尺度大的欄位主導主成分；也有人把 PCA 主成分直接當原始變數解釋，忽略其線性組合本質與<span class=\"highlight-red\">多重共線性</span>處理目的。"
        },
        {
            title: "綜合比較與核心評估方法總覽",
            principle: "不同演算法適合不同任務：線性模型重解釋、樹模型重非線性與特徵交互、集成模型重預測表現、分群與降維則用於探索資料結構。選模型前應先確認目標、資料型態與限制。",
            example: "同一份客戶資料可先用 PCA 觀察結構，再用 K-Means 做分群；若目標是預測流失，則改用邏輯迴歸、隨機森林或梯度提升樹，並比較解釋性與準確度。",
            evaluation: "迴歸任務看 MAE、MSE、RMSE、R²；分類任務看 Precision、Recall、<span class=\"highlight-red\">F1-Score</span>、<span class=\"highlight-red\">AUC</span>；分群任務看 SSE 與 Silhouette Score。評估必須搭配驗證集或交叉驗證。",
            mistake: "常見錯誤是只追求單一高分數，卻忽略資料洩漏、類別不平衡、可解釋性與部署成本。模型比較也要注意<span class=\"highlight-red\">過擬合</span>與資料前處理是否一致。"
        },
        {
            title: "機器學習進階學習路徑指南",
            principle: "進階學習應從資料理解、特徵工程、模型選擇、驗證策略、部署監控一路串起。演算法只是其中一段，真正的能力在於能穩定解決資料問題並解釋決策。",
            example: "建議路徑是先熟悉 Python、Pandas、視覺化與統計基礎，再實作迴歸、分類、分群與降維專案；接著學習交叉驗證、Pipeline、模型部署與監控。",
            evaluation: "可用作品集評估學習成果：是否能清楚說明問題、資料來源、特徵處理、模型比較、評估指標與限制。進階階段也應補上實驗紀錄、版本控管與自動化測試。",
            mistake: "常見錯誤是只背演算法名詞，沒有完整跑過資料專案；或忽略<span class=\"highlight-red\">正則化</span>、資料洩漏、模型監控與實務成本。學習路徑應重視可重現流程，而不是只追求更複雜模型。"
        }
    ];

    /* --- Topic Content Renderer --- */
    const algoContentDisplay = document.getElementById('algo-content-display');

    function renderTopic(index) {
        const topic = topics[index];
        if (!topic || !algoContentDisplay) return;

        const buttons = document.querySelectorAll('.algo-btn');
        buttons.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        algoContentDisplay.innerHTML = `
            <div class="topic-glass-card">
                <div class="algo-display-header">
                    <h3 class="display-title">${topic.title}</h3>
                    <span class="display-status-badge">Topic Active</span>
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
            </div>
        `;

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    // Bind event listeners to the 12 buttons
    const algoButtons = document.querySelectorAll('.algo-btn');
    algoButtons.forEach((button, idx) => {
        button.addEventListener('click', () => {
            renderTopic(idx);
            if (window.innerWidth <= 768) {
                requestAnimationFrame(() => {
                    const topicContent =
                        document.getElementById('topicContent') ||
                        algoContentDisplay;

                    if (topicContent) {
                        const offset = 90;
                        const targetPosition = topicContent.getBoundingClientRect().top + window.scrollY - offset;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
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
            { label: 'R簡', value: formatNumber(metrics.r2, 4), accent: 'metric-purple' }
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
                        label: '?Ｙ黎??(Outlier)',
                        data: [],
                        backgroundColor: 'rgba(239, 68, 68, 0.85)',
                        borderColor: '#ef4444',
                        pointRadius: 6,
                        pointHoverRadius: 8
                    },
                    {
                        label: '迴歸線',
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
                            text: '?孵噩 X',
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
                            text: '?格? Y',
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

    /* --- Hero Action Interactivity --- */
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
            showToast('?批捆撠銝??挾?');
        });
    });
});

