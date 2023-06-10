module.exports = {
	endOfLine: 'auto',
	printWidth: 100, //（默认值）单行代码超出 80 个字符自动换行
	tabWidth: 4, //（默认值）一个 tab 键缩进相当于 2 个空格
	useTabs: true, // 行缩进不使用 tab 键代替空格
	semi: false, //（默认值）禁止语句的末尾加上分号
	singleQuote: true, // 使用单引号
	quoteProps: 'as-needed', //（默认值）仅仅当必须的时候才会加上双引号
	trailingComma: 'none', // 不用在多行的逗号分隔的句法结构的最后一行的末尾加上逗号
	bracketSpacing: true, //（默认值）在括号和对象的文字之间加上一个空格
	arrowParens: 'avoid', // 当箭头函数中只有一个参数的时候可以忽略括弧
	embeddedLanguageFormatting: 'off' // 不允许格式化内嵌的代码块，比如 markdown  文件里的代码块
}
