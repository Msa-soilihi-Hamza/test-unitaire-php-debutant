# Tests Unitaires PHP pour Débutants

Ce projet démontre les bases des tests unitaires en PHP en utilisant une approche simple sans framework.

## Étapes du projet

### 1. Création de la structure de base

Nous avons créé la structure de dossiers suivante :
- `src/` pour les fichiers PHP

### 2. Création de la classe Math

Dans le fichier `src/Math.php`, nous avons créé une classe `Math` avec une méthode `addition` :

```php
class Math
{
    public function addition($a, $b)
    {
        return $a + $b;
    }
}
```

### 3. Création de la classe de test

Dans le fichier `src/MathTest.php`, nous avons créé une classe `MathTest` qui vérifie la méthode `Math::addition` :

```php
class MathTest
{
    public function testAddition()
    {
        $math = new Math();
        
        // Test avec des entiers
        $resultat1 = $math->addition(2, 3);
        if ($resultat1 !== 5) {
            echo "ÉCHEC: 2 + 3 devrait être égal à 5, mais a retourné $resultat1\n";
            return false;
        }
        
        // Test avec des nombres décimaux
        $resultat2 = $math->addition(1.5, 2.5);
        if ($resultat2 !== 4.0) {
            echo "ÉCHEC: 1.5 + 2.5 devrait être égal à 4.0, mais a retourné $resultat2\n";
            return false;
        }
        
        // Test avec un nombre négatif
        $resultat3 = $math->addition(-1, 5);
        if ($resultat3 !== 4) {
            echo "ÉCHEC: -1 + 5 devrait être égal à 4, mais a retourné $resultat3\n";
            return false;
        }
        
        echo "SUCCÈS: Tous les tests de la méthode addition ont réussi\n";
        return true;
    }
}
```

### 4. Test délibérément échoué

Nous avons modifié la méthode `addition` pour qu'elle retourne une valeur incorrecte :

```php
public function addition($a, $b)
{
    // Bug introduit volontairement pour faire échouer le test
    return $a + $b + 1;
}
```

**Résultat du test :**

```
ÉCHEC: 2 + 3 devrait être égal à 5, mais a retourné 6
```

![Test échoué](./assets/test_echoue.png)

### 5. Correction du bug

Nous avons corrigé la méthode `addition` pour qu'elle retourne le bon résultat :

```php
public function addition($a, $b)
{
    return $a + $b;
}
```

**Résultat du test :**

```
SUCCÈS: Tous les tests de la méthode addition ont réussi
```

![Test réussi](./assets/test_reussi.png)

## Tests avancés avec PHPUnit et Jest

Nous avons étendu notre projet en ajoutant des tests plus avancés avec des frameworks de test professionnels.

### Tests PHP avec PHPUnit

Nous avons créé une classe `Calculator` en PHP qui permet d'évaluer des expressions mathématiques et nous l'avons testée avec PHPUnit.

#### Installation de PHPUnit

PHPUnit est installé via Composer :

```bash
composer require --dev phpunit/phpunit
```

#### Classe Calculator

La classe `Calculator` (`src/Calculator.php`) permet d'évaluer des expressions mathématiques et gère :
- L'addition
- La soustraction
- La multiplication
- La division
- Les erreurs (division par zéro, expressions invalides)

#### Tests CalculatorTest

Le fichier `test/CalculatorTest.php` contient les tests suivants :

```php
class CalculatorTest extends TestCase 
{
    private $calculator;

    protected function setUp(): void
    {
        $this->calculator = new Calculator();
    }

    public function testAddition()
    {
        $this->assertEquals(5, $this->calculator->calculate('2+3'));
        $this->assertEquals(0, $this->calculator->calculate('-2+2'));
        $this->assertEquals(-5, $this->calculator->calculate('-2-3'));
    }

    public function testSoustraction()
    {
        $this->assertEquals(-1, $this->calculator->calculate('2-3'));
        $this->assertEquals(5, $this->calculator->calculate('8-3'));
        $this->assertEquals(-11, $this->calculator->calculate('-8-3'));
    }

    public function testMultiplication()
    {
        $this->assertEquals(6, $this->calculator->calculate('2*3'));
        $this->assertEquals(-6, $this->calculator->calculate('-2*3'));
        $this->assertEquals(6, $this->calculator->calculate('-2*-3'));
    }

    public function testDivision()
    {
        $this->assertEquals(2, $this->calculator->calculate('6/3'));
        $this->assertEquals(-2, $this->calculator->calculate('-6/3'));
        $this->assertEquals(2, $this->calculator->calculate('-6/-3'));
    }

    public function testDivisionParZero()
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->calculator->calculate('6/0');
    }
}
```

#### Exécution des tests PHP

Pour exécuter les tests PHPUnit, utilisez la commande :

```bash
vendor/bin/phpunit test/CalculatorTest.php
```

### Tests JavaScript avec Jest

Nous avons également créé une version JavaScript de notre calculatrice et l'avons testée avec Jest.

#### Installation de Jest

Jest est installé via npm :

```bash
npm install --save-dev jest
```

Configuration dans `package.json` :
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

#### Classe Calculator en JavaScript

La classe `Calculator` (`src/calculator.js`) évalue des expressions mathématiques et gère :
- L'addition
- La soustraction
- La multiplication
- La division
- Les priorités d'opération (`2+3*4`)
- Les parenthèses (`(2+3)*4`)
- Les erreurs (division par zéro, expressions invalides)

#### Tests avec Jest

Le fichier `test/calculator.test.js` contient les tests suivants :

```javascript
describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('addition', () => {
    test('devrait additionner deux nombres positifs', () => {
      expect(calculator.calculate('2+3')).toBe(5);
    });

    test('devrait gérer les nombres négatifs', () => {
      expect(calculator.calculate('-2+3')).toBe(1);
      expect(calculator.calculate('2+-3')).toBe(-1);
    });
  });

  describe('soustraction', () => {
    test('devrait soustraire deux nombres', () => {
      expect(calculator.calculate('5-3')).toBe(2);
    });

    test('devrait gérer les nombres négatifs', () => {
      expect(calculator.calculate('-5-3')).toBe(-8);
      expect(calculator.calculate('5--3')).toBe(8);
    });
  });

  // ... et d'autres tests pour multiplication, division, 
  // priorités d'opération, parenthèses et expressions invalides
});
```

#### Exécution des tests JavaScript

Pour exécuter les tests Jest, utilisez la commande :

```bash
npm test
```

### Défis rencontrés et solutions

#### Gestion des nombres négatifs

Un défi particulier a été de gérer correctement les nombres négatifs, en particulier les expressions comme `5--3` (qui devrait être interprété comme `5+3=8`).

Solution en JavaScript :
```javascript
// Gère le cas spécial des doubles signes négatifs
const preparedExpression = sanitizedExpression
  .replace(/--/g, '+')       // Double négatif devient positif
  .replace(/\+-/g, '-')      // +- devient simplement -
  .replace(/-\+/g, '-');     // -+ devient simplement -
```

#### Validation des expressions

Nous avons implémenté une validation robuste pour vérifier que les expressions sont valides avant de les évaluer.

### Résultats finaux

✅ **Tests PHP avec PHPUnit :** 5 tests passés avec succès (13 assertions)
✅ **Tests JavaScript avec Jest :** 15 tests passés avec succès

## Comment exécuter les tests

Pour exécuter les tests simples :
```bash
php src/MathTest.php
```

Pour exécuter les tests avec PHPUnit :
```bash
vendor/bin/phpunit test/CalculatorTest.php
```

Pour exécuter les tests avec Jest :
```bash
npm test
```

## Ce que nous avons appris

- Création de tests unitaires basiques en PHP
- Détection et correction des erreurs dans le code
- Utilisation de frameworks de test professionnels (PHPUnit et Jest)
- Tests des fonctionnalités complexes (expressions mathématiques)
- Gestion des cas d'erreur (division par zéro, expressions invalides)
- Stratégies pour traiter des cas particuliers (comme les nombres négatifs) 