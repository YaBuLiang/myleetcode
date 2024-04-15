//两数相加
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

//涉及基础
//1.首先要理解链表 链表结构
//读取链表只需获取链表的第一个节点，然后遍历链表，直到到达链表的末尾。

//思路
//公理1：编写任何函数首先都要确定它的输入和输出。
//输入：两个链表的头部
//输出：一个链表的头部 (确认输出为一个链表head)

//公理2：对于批量的数据处理 需要确认最基本的逻辑
//最基本的逻辑是两数相加 进位
//需要定义一个进位变量 初始化为0

//优化

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

//一
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let head: ListNode | null = null;
    let tail: ListNode | null = null;
    let carry = 0;
    while (l1 || l2) {
        const v1 = l1 ? l1.val : 0;
        const v2 = l2 ? l2.val : 0;
        const sum = v1 + v2 + carry;
        carry = Math.floor(sum / 10);
        if(carry==0 && (!l1&&l2) || (l1&&!l2)){
            if(l1&&tail){
                tail.next = l1
            }
            if(l2&&tail){
                tail.next = l2
            }
            break
        }
        if (!head) {
            head = tail = new ListNode(sum % 10);
        } else if (tail) {
            tail.next = new ListNode(sum % 10);;
            tail = tail.next;
        }
        
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    if (carry > 0 && tail) {
        tail.next = new ListNode(carry);
    }

    return head
};
//二
function getListStr(head: ListNode | null): string {
    let str = "";
    while (head) {
        str = head.val+str;
        head = head.next;
    }
    return str;
}
function toListNode(num:number): ListNode | null {
    const str = num+'';
    const arr = str.split("");
    arr.reverse();
    let head: ListNode | null = null;
    let tail: ListNode | null = null;
    arr.forEach(v => {
        const node = new ListNode(Number(v));
        if (!head) {
            head = tail = node;
        } else if(tail){
            tail.next = node;
            tail = node;
        }
    })
    
    return head;
}
// function addTwoNumbers2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
//     const l1Num = BigInt(getListStr(l1));
//     const l2Num = BigInt(getListStr(l2));
//     return toListNode(l1Num + l2Num);
// }
const l1 = toListNode(9999999);
const l2 = toListNode(9999);
console.log(getListStr(addTwoNumbers(l1,l2)))
