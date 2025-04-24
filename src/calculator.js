/**
 * Classe Calculator pour évaluer des expressions mathématiques
 */
class Calculator {
  /**
   * Évalue une expression mathématique sous forme de chaîne
   * @param {string} expression - L'expression mathématique à évaluer
   * @returns {number} - Le résultat de l'évaluation
   * @throws {Error} - Si l'expression est invalide ou contient une division par zéro
   */
  calculate(expression) {
    // Nettoie l'expression en supprimant les espaces
    const sanitizedExpression = this.sanitizeExpression(expression);
    
    // Vérifie que l'expression est valide
    if (!this.isValidExpression(sanitizedExpression)) {
      throw new Error('Expression invalide');
    }
    
    // Vérifie la division par zéro
    if (/\/0(?![0-9.])/.test(sanitizedExpression)) {
      throw new Error('Division par zéro');
    }
    
    try {
      // Gère le cas spécial des doubles signes négatifs (5--3) en les transformant en addition (5+3)
      const preparedExpression = sanitizedExpression
        .replace(/--/g, '+')         // Double négatif devient positif (--x → +x)
        .replace(/\+-/g, '-')        // +- devient simplement -
        .replace(/-\+/g, '-');       // -+ devient simplement -
      
      // Crée une fonction qui évalue l'expression
      const result = new Function(`return ${preparedExpression}`)();
      
      // Vérifie si le résultat est un nombre valide
      if (isNaN(result) || !isFinite(result)) {
        throw new Error('Résultat invalide');
      }
      
      return result;
    } catch (error) {
      throw new Error(`Erreur lors de l'évaluation: ${error.message}`);
    }
  }

  /**
   * Vérifie si l'expression est valide
   * @param {string} expression - L'expression à vérifier
   * @returns {boolean} - true si l'expression est valide, false sinon
   */
  isValidExpression(expression) {
    // Vérifie si l'expression contient que des caractères autorisés
    if (!/^[0-9+\-*/().]+$/.test(expression)) {
      return false;
    }
    
    // Vérifie les parenthèses non équilibrées
    let count = 0;
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === '(') count++;
      else if (expression[i] === ')') count--;
      if (count < 0) return false;  // Plus de fermantes que d'ouvrantes
    }
    if (count !== 0) return false;  // Nombre différent d'ouvrantes et fermantes
    
    // Vérifie les opérateurs invalides: ++, //, ** (mais pas -- qui est valide)
    if (/(\+\+|\*\*|\/\/)/.test(expression)) {
      return false;
    }
    
    // Vérifie les opérateurs adjacents invalides
    if (/[\+\-\*\/][\*\/]/.test(expression)) {
      return false;
    }
    
    // Vérifie si l'expression commence par un opérateur invalide
    if (/^[\+\*\/]/.test(expression)) {
      return false;
    }
    
    // Vérifie si l'expression se termine par un opérateur
    if (/[\+\-\*\/]$/.test(expression)) {
      return false;
    }
    
    return true;
  }

  /**
   * Nettoie l'expression pour l'évaluation
   * @param {string} expression - L'expression à nettoyer
   * @returns {string} - L'expression nettoyée
   */
  sanitizeExpression(expression) {
    return expression.replace(/\s+/g, '');
  }
}

module.exports = Calculator; 