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

## Comment exécuter les tests

Pour exécuter les tests, utilisez la commande suivante :

```bash
php src/MathTest.php
```

## Ce que nous avons appris

- Création de tests unitaires basiques en PHP
- Détection des erreurs dans le code
- Correction des bugs
- Vérification du bon fonctionnement du code après correction 