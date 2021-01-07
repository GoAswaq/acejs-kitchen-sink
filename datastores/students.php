<?php
global $students;
$students = [
    [
        'student_id' => 1,
        'student_name' => 'Bob Marley',
        'student_birthday'  => '1945-02-06',
        'student_sex'  => 'M',
        'student_country'  => 'Jamaica',
    ],
    [
        'student_id' => 2,
        'student_name' => 'Freddy Mercury',
        'student_birthday'  => '1946-09-05',
        'student_sex'  => 'M',
        'student_country'  => 'Zanzibar',
    ],
    [
        'student_id' => 3,
        'student_name' => 'Shania Twain',
        'student_birthday'  => '1965-09-28',
        'student_sex'  => 'F',
        'student_country'  => 'Canada',
    ],
    [
        'student_id' => 4,
        'student_name' => 'Jennifer Lopez',
        'student_birthday'  => '1969-07-24',
        'student_sex'  => 'F',
        'student_country'  => 'USA',
        'student_nickname' => 'J.Lo',
    ],
    [
        'student_id' => 5,
        'student_name' => 'Gordon Matthew Thomas Sumner aka Sting',
        'student_birthday'  => '1951-10-02',
        'student_sex'  => 'M',
        'student_country'  => 'England',
        'student_nickname' => 'Sting',
    ],
    [
        'student_id' => 6,
        'student_name' => 'Evángelos Odysséas Papathanassíou',
        'student_birthday'  => '1943-03-29',
        'student_sex'  => 'M',
        'student_country'  => 'Greece',
        'student_nickname' => 'Vangelis',
    ],
    [
        'student_id' => 7,
        'student_name' => 'Shakira Isabel Mebarak Ripoll',
        'student_birthday'  => '1977-02-02',
        'student_sex'  => 'F',
        'student_country'  => 'Columbia',
    ],
    [
        'student_id' => 8,
        'student_name' => 'Elton John',
        'student_birthday'  => '1947-03-25',
        'student_sex'  => 'M',
        'student_country'  => 'Englang',
    ],
    [
        'student_id' => 9,
        'student_name' => 'Tarja Soile Susanna',
        'student_birthday'  => '1977-08-17',
        'student_sex'  => 'F',
        'student_country'  => 'Finland',
        'student_nickname' => 'Tarja',
    ],
    [
        'student_id' => 10,
        'student_name' => 'Loreena Isabel Irene McKennitt',
        'student_birthday'  => '1957-02-17',
        'student_sex'  => 'F',
        'student_country'  => 'Canada',
    ],
    [
        'student_id' => 11,
        'student_name' => 'Michael Joseph Jackson',
        'student_birthday'  => '1958-08-29',
        'student_sex'  => 'M',
        'student_country'  => 'USA',
        'student_nickname' => 'King of Pop',
    ],
    
];

if( $_SESSION[__app_session_prefix]['extra_students'] ){
    $students = array_merge($students, $_SESSION[__app_session_prefix]['extra_students']);
}

?>