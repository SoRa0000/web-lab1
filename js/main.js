$(function (){
    let x_value_validate = false;
    let y_value_validate = false;
    let r_value_validate = false;
    let x_value = null;
    let y_value = null;
    let r_value = null;
    let i = 1;

    function checkNum(n){
        return !isNaN( parseFloat(n) && isFinite(n))
    }
    function checkRange(min,max,num){
        if(checkNum(num)){
            return num >= min && max >= num
        }
        else{
            return false;
        }
    }
    function validateForm(){
        return x_value_validate && y_value_validate && r_value_validate
    }
        $('.x-btn').click(function (){
            if($(this).attr('data-selected') === 'true'){
                $(this).attr('data-selected','false');
                $(this).removeClass('selected-btn');
                x_value = null;
                x_value_validate = false;
            }
            else{
                $(this).closest('div.x_values').find('.x-btn').not(this)
                    .removeClass('selected-btn').attr('data-selected','false');
                $(this).attr('data-selected','true');
                $(this).addClass('selected-btn');
                x_value_validate = true;
                x_value = $(this).val();
            }
        });

        $("#y-value").on('input',function(){
            const input = $(this);
            const is_Num = checkRange(-3, 5, input.val().replace(',','.'));
            if(is_Num){
                input.removeClass("invalid-input").addClass('valid-input')
                y_value = $(this).val();
                y_value_validate = true;
            }
            else{
                console.log("asd")
                input.removeClass('valid-input').addClass('invalid-input')
                y_value_validate = false;
                y_value = null;
            }

        })

        $("#r-value").on('input',function(){
            const input = $(this);
            const is_Num = checkRange(2, 5, input.val().replace(',','.'));
            if(is_Num){
                input.removeClass("invalid-input").addClass('valid-input')
                r_value = $(this).val();
                r_value_validate = true;
            }
            else{
                console.log("asd")
                input.removeClass('valid-input').addClass('invalid-input');
                r_value_validate = false;
                r_value = null;
            }
        })

    $('#input-form').submit(function(event){
        if(validateForm()){
            $('#error').empty();
            var formData = {
                xVal: x_value,
                yVal: y_value,
                rVal: r_value,
                timezone: new Date().getTimezoneOffset(),
            }
            console.log(formData);
            $.ajax({
                type: 'POST',
                url: 'main.php',
                data: formData,
                dataType: "json",
                success: function (data){
                    $('.check_button').attr('disabled',false);
                    let newRow;
                    console.log(data);
                    newRow = '<tr>';
                    newRow += '<td>' + i++ + '</td>';
                    newRow += '<td>' +data[0] + '</td>';
                    newRow += '<td>' +data[1] + '</td>';
                    newRow += '<td>' +data[2] + '</td>';
                    newRow += '<td>' +data[3] + '</td>';
                    newRow += '<td>' +data[4] + '</td>';
                    if(data[5]){
                        newRow += '<td class="true">' +data[5] + '</td>';
                    }else{
                        newRow += '<td class="false">' +data[5] + '</td>';
                    }
                    $("#result-table").prepend(newRow);
                },
                error: function(jqxhr,status,exception) {
                    alert(exception);
                }
            }).done(function(data){
                console.log(data);
            })
        }
        else{
            $('#error').text("Please fill in all required fields correctly!")
        }
        event.preventDefault();
    })
});
