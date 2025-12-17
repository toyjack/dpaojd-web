export type RawText = {
  id: string;
  created_at: string;
  updated_at: string;
  text: string;
};


export interface JyobatsuSearchParams {
  本文検索?: string;          // 本文全文检索
  書名検索?: string;          // 书名模糊检索
  編者検索?: string;          // 编者模糊检索
  出版社検索?: string;        // 出版社模糊检索
  序跋名称検索?: string;      // 序跋名称模糊检索
  作成者検索?: string;        // 作成者模糊检索
  出版年和暦検索?: string;    // 出版年（和暦）模糊检索
  出版年西暦開始?: number;    // 出版年（西暦）范围开始
  出版年西暦終了?: number;    // 出版年（西暦）范围结束
  本文文字種?: string;        // 文字种类精确匹配
  文献ID?: number;            // 指定文献ID
  match_type?: 'all' | 'direct' | 'partial' | 'no_honbun';
  cross_line?: boolean;       // 是否启用跨行检索
}

export interface JyobatsuSearchResultAdvanced {
  ID: string;
  文献ID: number;
  同一ID内順序: number;
  作成者: string;
  整理番号: string;
  書名: string;
  編者: string;
  出版社: string;
  出版年和暦: string;
  出版年西暦: string;
  本文文字種: string;
  序跋名称: string;
  本文: string;
  所在表示: string;
  左右: string;
  行: number;
  備考: string;
  直接包含検索語: boolean;
  高亮本文: string;
  匹配状態: string;
  relevance_score: number;
  total_count: number;
}

export interface FilterOptions {
  本文文字種選択肢: string[];
  出版年西暦範囲: {
    min: number;
    max: number;
  };
  作成者選択肢: string[];
  総文献数: number;
  総記錄数: number;
}

export interface SearchFormData {
  honbunSearch: string;
  shomeiSearch: string;
  henshaSearch: string;
  shuppanshaSearch: string;
  jobatsuNameSearch: string;
  yearFrom: string;
  yearTo: string;
  mojiShurui: string;
  crossLine: boolean;
  matchType: 'all' | 'direct' | 'partial';
}