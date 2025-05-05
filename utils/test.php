<?php

include('../ini/include_all.php');

$dictionary_marrital_status = [
    'MERRIED' => 'Merried',
    'SINGLE' => 'Single',
    'DIVORCED' => 'Divorced',
    'WIDOWER' => 'Widower',
];
$dictionary_profession = [
    'PROGRAMMER' => 'Programmer',
    'COOK' => 'Cook',
    'FIREFIGHTER' => 'Fire Fighter',
    'PHOTOGRAPH' => 'Photograph',
    'DIPLOMAT' => 'Diplomat',
    'SCIENTIST' => 'Scientist',
];

$dictionary_sex = [
    'FEMALE' => 'Female',
    'MALE' => 'Male',
];


$test_data = [
    [
        'id' => 1,
        'name' => 'Linus Torvalds',
        'profession' => $dictionary_profession['PROGRAMMER'],
        'marital_status' => $dictionary_marrital_status['MERRIED'],
        'email' => 'lt@programmer.com',
        'sex' => $dictionary_sex['MALE'],
        'alive' => 1
    ],
    [
        'id' => 2,
        'name' => 'Grace Hopper',
        'profession' => $dictionary_profession['PROGRAMMER'],
        'marital_status' => $dictionary_marrital_status['DIVORCED'],
        'email' => 'gh@programmer.com',
        'sex' => $dictionary_sex['FEMALE'],
        'alive' => 0
    ],
    [
        'id' => 3,
        'name' => 'Bjarne Stroustrup',
        'profession' => $dictionary_profession['PROGRAMMER'],
        'marital_status' => $dictionary_marrital_status['MERRIED'],
        'email' => 'bs@programmer.com',
        'sex' => $dictionary_sex['MALE'],
        'alive' => 1
    ],
    [
        'id' => 4,
        'name' => 'Albert Einstein',
        'profession' => $dictionary_profession['SCIENTIST'],
        'marital_status' => $dictionary_marrital_status['WIDOWER'],
        'email' => 'aa@science.com',
        'sex' => $dictionary_sex['MALE'],
        'alive' => 0
    ],
    [
        'id' => 5,
        'name' => 'Jane Goodall',
        'profession' => $dictionary_profession['SCIENTIST'],
        'marital_status' => $dictionary_marrital_status['WIDOWER'],
        'email' => 'jd@science.com',
        'sex' => $dictionary_sex['FEMALE'],
        'alive' => 1
    ],
    [
        'id' => 6,
        'name' => 'Gordon Ramsay',
        'profession' => $dictionary_profession['COOK'],
        'marital_status' => $dictionary_marrital_status['MARRIED'],
        'email' => 'gr@cook.com',
        'sex' => $dictionary_sex['MALE'],
        'alive' => 1
    ],
];

print_a($test_data);

?>