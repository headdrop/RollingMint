@mixin colorset {
// https://github.com/sapegin/squirrelsong/tree/master/light
// gray04	#4b4a4d	75, 74, 77
// gray07	#727075	114, 112, 117
// gray09	#9b959d	155, 149, 157
// gray0c	#cbc9ce	203, 201, 206
// gray0d	#d9d7dc	217, 215, 220
// gray0e	#e9e9ef	233, 233, 239
// gray0f	#f5f5f7	245, 245, 247
// white	#ffffff	255, 255, 255
// gren	#a7b386	167, 179, 134
// greenLight	#d3d9c2	211, 217, 194
// greenLighter	#e9ece1	233, 236, 225
// greenContrast	#5a7f24	90, 127, 36
// teal	#5b9a8b	91, 154, 139
// tealLight	#adccc5	173, 204, 197
// tealLighter	#d6e6e2	214, 230, 226
// tealContrast	#3f7d6c	63, 125, 108
// blue	#80a4be	128, 164, 190
// blueLight	#bfd1de	191, 209, 222
// blueLighter	#dfe8ef	223, 232, 239
// blueContrast	#4e7997	78, 121, 151
// purple	#af9fc7	175, 159, 199
// purpleLight	#d7cfe3	215, 207, 227
// purpleLighter	#ebe7f1	235, 231, 241
// purpleContrast	#856caa	133, 108, 170
// red	#cc5c52	204, 92, 82
// redLight	#e5ada8	229, 173, 168
// redLighter	#f3dcda	243, 220, 218
// redContrast	#bc5248	188, 82, 72
// orange	#de9e59	222, 158, 89
// orangeLight	#eeceac	238, 206, 172
// orangeLighter	#f7e7d5	247, 231, 213
// orangeContrast	#9f6221	159, 98, 33
// yellow	#e6c565	230, 197, 101
// yellowLight	#e9d9a8	233, 217, 168
// yellowLighter	#f7f0de	247, 240, 222
// yellowContrast	#ac9032	172, 144, 50
// brightPink	#ef6c9c	239, 108, 156
// brightPinkLight	#fae1ea	250, 225, 234
// brightYellow	#faebaf	250, 235, 175
// brightYellowLight	#fdf7e1	253, 247, 225
// Code colors
// Where	Color	Hex	Style
// Punctuation	gray07	#727075	
// Comment	gray09	#9b959d	
// Keyword, tag name	purple	#af9fc7	Bold
// Number, boolean	orange	#de9e59	
// Property, attribute name	blue	#80a4be	
// Variable	blue	#80a4be	Italic
// Function	blue	#80a4be	Bold
// String, attribute value, inserted	green	#a7b386	
// Type, namespace, colon	teal	#5b9a8b	
// Class, at-rule, operator	teal	#5b9a8b	Bold
// Regexp, deleted	red	#cc5c52	
// Important	red	#cc5c52	Bold
// URL	blueContrast	#4e7997	
// Selection background	brightYellowLight	#fdf7e1	
// Line highlight background	gray0f	#f5f5f7	
// UI colors
// Where	Color	Hex	Comments
// Dark text foreground, match foreground	gray07	#4b4a4d	
// Text foreground	gray07	#727075	
// Secondary foreground	gray07	#9b959d	
// Disabled foreground	gray0c	#cbc9ce	
// Accent foreground	gray07	#727075	
// Link foreground	blueContrast	#4e7997	
// Link hover foreground	blue	#80a4be	
// Text background	white	#ffffff	
// Background	gray0f	#f5f5f7	Sidebars, popups
// Button background	gray07	#727075	
// Selection background	gray0e	#e9e9ef	
// Hover background	gray0d	#d9d7dc	
// Border	gray0c	#cbc9ce	
// Focus border	gray07	#727075	
// ANSI colors
// Name	Color	Hex
// Black	gray04	#4b4a4d
// Black bright	gray07	#727075
// White	gray0f	#ffffff
// White bright	gray07	#f5f5f7
// Blue	blue	#80a4be
// Blue bright	blueLight	#bfd1de
// Cyan	teal	#5b9a8b
// Cyan bright	tealLight	#adccc5
// Green	green	#a7b386
// Green bright	greenLight	#d3d9c2
// Magenta	purple	#af9fc7
// Magenta bright	purpleLight	#d7cfe3
// Red	red	#cc5c52
// Red bright	redLight	#e5ada8
// Yellow	yellow	#e6c565
// Yellow bright	yellowLight	#e9d9a8
}