<?php

use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../src/Calculator.php';

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
