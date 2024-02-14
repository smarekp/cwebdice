const { DiceRoller, exportFormats } = require('@dice-roller/rpg-dice-roller');
const roller = new DiceRoller();

document.addEventListener('DOMContentLoaded', function(event) {

	document.getElementById('select').addEventListener('change', function(event) {
		var icon = document.getElementById('select-icon');
		var value = event.srcElement.value;
		icon.className = 'select-icon icon-' + value;
		icon.innerHTML = value;
	});

	document.querySelectorAll('[data-append]').forEach(function(element, index, list) {
		element.addEventListener('click', function(event) {
			var input = document.getElementById('input');
			var append = event.srcElement.getAttribute('data-append');
			input.value += append;
		});
	});

	document.querySelectorAll('[data-action]').forEach(function(element, index, list) {
		element.addEventListener('click', function(event) {
			var input = document.getElementById('input');
			var action = event.srcElement.getAttribute('data-action');
			switch (action) {
				case 'calculate':
					var notation = input.value.replace('×', '*').replace('÷', '/');
					var roll = roller.roll(notation);
					document.getElementById('output').innerHTML = roll.output;
					console.log(roll.export(exportFormats.OBJECT));
					break;
				case 'clear':
					input.value = '';
					break;
				case 'delete':
					input.value = input.value.slice(0, -1);
					break;
				default:
					console.log(action, event);
			}
		});
	});

});