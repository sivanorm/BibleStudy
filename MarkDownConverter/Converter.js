$(document).ready(function() {
    // Roman numeral to number conversion function
    function romanToNumber(roman) {
      const romanNumeralMap = {
        'I': 1, 'II': 2, 'III': 3
      };
      
      let number = 0;
      let previousValue = 0;
  
      for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanNumeralMap[roman[i]];
  
        if (currentValue < previousValue) {
          number -= currentValue;
        } else {
          number += currentValue;
        }
  
        previousValue = currentValue;
      }
  
      return number;
    }
  
    // Conversion logic
    $('button.convert').click(function() {
      const input = $('#txtVerse').val().trim();
  
      if (input === "") {
        alert("Please enter some verses.");
        return;
      }
  
      const parts = input.split(';')
                         .map(part => part.trim())
                         .filter(part => part.length > 0);
  
      if (parts.length === 0) {
        alert("Please enter valid verses separated by semicolons.");
        return;
      }
  
      let output = '';
      parts.forEach(part => {
        // Extract Roman numerals from the part and convert them to numbers
        const romanNumeralMatch = part.match(/[IVXLCDM]+/);  // This regex matches Roman numerals
  
        if (romanNumeralMatch) {
          const romanNumeral = romanNumeralMatch[0];
          const numericValue = romanToNumber(romanNumeral);
          part = part.replace(romanNumeral, numericValue);  // Replace the Roman numeral with its numeric equivalent
        }
  
        output += `[${part}](${part})\n\n`;
      });
  
      $('#txtOutput').val(output);
    });
  
    // Copy to Clipboard logic
    $('button.copy').click(function() {
      const outputText = $('#txtOutput').val();
      if (outputText === "") {
        alert("There is nothing to copy.");
        return;
      }
  
      navigator.clipboard.writeText(outputText).then(function() {
        alert("Output copied to clipboard!");
      }, function(err) {
        alert("Failed to copy text: " + err);
      });
    });
  });
  