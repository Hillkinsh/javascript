[
  // 1. tax列表页
  {
    name: 'taxLatest',
    url: '{serverCloud}/cloud-search-seo/tax/recommand/latest?pageNum={pn:1}&pageSize={ps:10}',
    title: '最新注册企业税号'
  },

  // 详情页
  {
    name: 'taxLatest',
    url: '{serverCloud}/cloud-search-seo/tax/recommand/latest?pageNum={pn:1}&pageSize={ps:10}',
    title: '最新注册企业税号'
  },


  // 2. 企业年报 列表页
  {
    name: 'latestNianbao',
    url: '{serverCloud}/cloud-search-seo/annualreport/latest.json?pageNum={pn:1}&pageSize={ps:15}',
    title: '最新企业年报'
  },
  {
    name: 'nianbao500',
    url: '{serverCloud}/cloud-search-seo/annualreport/recommend.json?pageNum={pn:1}&pageSize={ps:12}',
    title: '知名企业年报'
  },
  {
    name: 'hotNianbao',
    url: '{serverCloud}/cloud-search-seo/annualreport/hot/recommend.json?pageNum={pn:1}&pageSize={ps:10}',
    title: '热门企业年报'
  },

  // 年报 详情页 推荐公司，最新注册公司，热搜公司
  { // 爬虫
    name: 'recommendCompany',
    url: '{serverCloud}/cloud-search-seo/citysite/recommand/uncollected/company?pageSize=10&urlPostFix={urlPostFix}',
    title: '推荐公司'
  },
  { // 爬虫
    name: 'recentRegister',
    url: 'v3/recent/registerFm.json?pageNum={pn:1}&pageSize={ps:10}',
    title: '最新注册公司'
  },
  { // 爬虫
    name: 'hotSearchCompany',
    url: 'v3/seo/getHotSearchWords?pageNum={pn:1}&pageSize={ps:10}&type=2',
    title: '今日热搜公司'
  },

  // 查老赖
  // 列表 配置3个

  {
    name: 'deadbeatCompany',
    url: '{serverCloud}/cloud-search-seo/deadbeat/recommend/company.json?source={source}&pageSize={ps:15}',
    title: '失信企业'
  },
  {
    name: 'deadbeatHuman',
    url: '{serverCloud}/cloud-search-seo/deadbeat/recommend/human.json?source={source}&pageSize={ps:15}',
    title: '失信自然人'
  },
  { // 爬虫
    name: 'recommendCompany',
    url: '{serverCloud}/cloud-search-seo/citysite/recommand/uncollected/company?pageSize=10&urlPostFix={urlPostFix}',
    title: '推荐公司'
  },
    // 详情 

    {
      name: 'deadbeatCompany',
      url: '{serverCloud}/cloud-search-seo/deadbeat/recommend/company.json?source={source}&pageSize={ps:15}',
      title: '失信企业'
    },
    {
      name: 'deadbeatHuman',
      url: '{serverCloud}/cloud-search-seo/deadbeat/recommend/human.json?source={source}&pageSize={ps:15}',
      title: '失信自然人'
    },
    { // 爬虫
      name: 'recommendCompany',
      url: '{serverCloud}/cloud-search-seo/citysite/recommand/uncollected/company?pageSize=10&urlPostFix={urlPostFix}',
      title: '推荐公司'
    },




  //4. 专利查询：列表页
  {
    name: 'patentLatest',
    url: '{serverCloud}/cloud-search-seo/patent/recommand/latest?source={source}&pageSize={ps:10}',
    title: '最新专利推荐'
  },

  // 专利详情页：推荐公司、最新注册公司、今日热搜公司
  { // 爬虫
    name: 'recommendCompany',
    url: '{serverCloud}/cloud-search-seo/citysite/recommand/uncollected/company?pageSize=10&urlPostFix={urlPostFix}',
    title: '推荐公司'
  },
  { // 爬虫
    name: 'recentRegister',
    url: 'v3/recent/registerFm.json?pageNum={pn:1}&pageSize={ps:10}',
    title: '最新注册公司'
  },
  { // 爬虫
    name: 'hotSearchCompany',
    url: 'v3/seo/getHotSearchWords?pageNum={pn:1}&pageSize={ps:10}&type=2',
    title: '今日热搜公司'
  },


  // 5.商标查询：列表页
{
  name: 'latestTm',
  url: '{serverCloud}/cloud-search-seo/tm/latest?pageSize={ps:10}',
  title: '最新注册商标'
},
{
  name: 'hotCompanyTm',
  url: '{serverCloud}/cloud-search-seo/tm/hotCompany?pageSize={ps:10}',
  title: '知名公司商标'
},

// 商标详情页：
  {
    name: 'latestTm',
    url: '{serverCloud}/cloud-search-seo/tm/latest?pageSize={ps:10}',
    title: '最新注册商标'
  },

// 6. 版权查询
// 6.1软件著作权 软件著作权列表页
{
  name: 'lastRj',
  url: '{serverCloud}/cloud-search-seo/copyright/latestReg?pageSize={ps:10}',
  title: '最新注册软件著作权'
},
{
  name: 'knowRj',
  url: '{serverCloud}/cloud-search-seo/copyright/reg/knownCompany?pageSize={ps:10}',
  title: '知名公司软件著作权'
},
// 6.2软件著作权详情页

{
  name: 'lastRj',
  url: '{serverCloud}/cloud-search-seo/copyright/latestReg?pageSize={ps:10}',
  title: '最新注册软件著作权'
},
{
  name: 'knowRj',
  url: '{serverCloud}/cloud-search-seo/copyright/reg/knownCompany?pageSize={ps:10}',
  title: '知名公司软件著作权'
},


// 6.3 版权：作品著作权 列表页
{
  name: 'lastZp',
  url: '{serverCloud}/cloud-search-seo/copyright/latestWork?pageSize={ps:10}',
  title: '最新注册作品著作权'
},
{
  name: 'knowZp',
  url: '{serverCloud}/cloud-search-seo/copyright/work/knownCompany?pageSize={ps:10}',
  title: '知名公司作品著作权'
},
// 6.4 版权：作品著作权 详情页
{
  name: 'lastZp',
  url: '{serverCloud}/cloud-search-seo/copyright/latestWork?pageSize={ps:10}',
  title: '最新注册作品著作权'
},
{
  name: 'knowZp',
  url: '{serverCloud}/cloud-search-seo/copyright/work/knownCompany?pageSize={ps:10}',
  title: '知名公司作品著作权'
},


// 7 备案： 列表页
// 最新备案信息推荐
{
  name: 'beianLast',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize={ps:20}',
  title: '最新备案信息推荐'
},

// 详情页
// 最新备案信息推荐
{
  name: 'beianLast',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize={ps:20}',
  title: '最新备案信息推荐'
},

// 8: 企业新闻：
// 8.1首页： 您可能感兴趣、大家都在看、最新新闻 + 爬虫:推荐公司
{
  name: 'newsInterest',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize=12',
  title: '您可能感兴趣'
},
{
  name: 'newsLook',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize=13',
  title: '大家都在看'
},
{
  name: 'latestNews',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize=10',
  title: '最新新闻'
},
{ // 爬虫
  name: 'recommendCompany',
  url: '{serverCloud}/cloud-search-seo/citysite/recommand/uncollected/company?pageSize=10&urlPostFix={urlPostFix}',
  title: '推荐公司'
},

// 8.2 列表页：您可能感兴趣、大家都在看、最新新闻 + 爬虫:推荐公司
{
  name: 'newsInterest',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize=12',
  title: '您可能感兴趣'
},
{
  name: 'newsLook',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize=13',
  title: '大家都在看'
},
{
  name: 'latestNews',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize=10',
  title: '最新新闻'
},
{ // 爬虫
  name: 'recommendCompany',
  url: '{serverCloud}/cloud-search-seo/citysite/recommand/uncollected/company?pageSize=10&urlPostFix={urlPostFix}',
  title: '推荐公司'
},


// 8.3 详情页
{
  name: 'latestNews',
  url: '{serverCloud}/cloud-search-seo/icp/last?pageSize=10',
  title: '最新新闻'
},
{ // 爬虫
  name: 'recommendCompany',
  url: '{serverCloud}/cloud-search-seo/citysite/recommand/uncollected/company?pageSize=10&urlPostFix={urlPostFix}',
  title: '推荐公司'
},



// 9.法律诉讼列表页：最新文书推荐”）、知名公司文书、最新注册公司（一行样式+自动化）
{
  name: 'getLawsuitLatest',
  url: '{serverCloud}/cloud-search-seo/lawsuit/latest?pageSize={ps:10}',
  title: '最新文书推荐'
},
{
  name: 'getLawsuitWellKnowCompany',
  url: '{serverCloud}/cloud-search-seo/lawsuit/wellKnowCompany?pageSize={ps:10}',
  title: '知名公司文书'
},
{
  name: 'recentRegister',
  url: 'v3/recent/registerFm.json?pageNum={pn:1}&pageSize={ps:10}',
  title: '最新注册公司'
},

// 法律诉讼： 详情页：
{
  name: 'getLawsuitLatest',
  url: '{serverCloud}/cloud-search-seo/lawsuit/latest?pageSize={ps:10}',
  title: '最新文书推荐'
},
{
  name: 'recentRegister',
  url: 'v3/recent/registerFm.json?pageNum={pn:1}&pageSize={ps:10}',
  title: '最新注册公司'
},